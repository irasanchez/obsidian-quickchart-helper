import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
const removeMd = require('remove-markdown');
const axios = require('axios')
const fm = require('front-matter')
// const { removeStopwords, eng, fra } = require('stopword')


interface ObsidianQuickChartHelperSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: ObsidianQuickChartHelperSettings = {
	mySetting: 'default'
}

export default class ObsidianQuickChartHelper extends Plugin {
	settings: ObsidianQuickChartHelperSettings;

	async onload() {
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'word-cloud--current-note',
			name: 'Make a word cloud using this note',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				// console.log("cursor", editor.getCursor())
				let { data } = view
				let frontmatterData = fm(data)
				let noteWithoutFancySymbols = removeMd(data).replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/·/g, "").replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "").replace(/\?/g, "").split(" ").join(",")
				try {
					const response = await axios.post('https://quickchart.io/wordcloud', {
					  format: 'svg',
					  text: noteWithoutFancySymbols,
					  removeStopwords: true,
					  useWordList: true,
					  language: "en"
					});
					console.log({frontmatterData})
					editor.replaceRange("\n"+response.data+"\n", {line: frontmatterData.bodyBegin, ch: 0});
				  } catch (error) {
					new Notice("Sorry, there was a problem making your word cloud! 😢")
				  }
				console.log({noteWithoutFancySymbols})
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'open-sample-modal-complex',
		// 	name: 'Open sample modal (complex)',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// });

		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new ObsidianQuickChartHelperSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class ObsidianQuickChartHelperSettingTab extends PluginSettingTab {
	plugin: ObsidianQuickChartHelper;

	constructor(app: App, plugin: ObsidianQuickChartHelper) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
