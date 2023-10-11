# Obsidian QuickChart Helper

📊 Get data visualizations in your notes as SVGs or PNGs. Compatible with Obsidian Publish.


 ![Obsidian](https://img.shields.io/badge/Obsidian-%23483699.svg?style=for-the-badge&logo=obsidian&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

---

This is a tool I am making to make it easier to put data visualizations in my notes, using data from my notes. It uses the QuickChart API to generate an svg or png to insert into the note. 

It's not even alpha let alone beta, so please exercise patience and report issues if you choose to install this now. 

This currently only makes a word cloud using the current note. It removes links, emails, punctuation, and stop words automatically. There currently is no Settings page to adjust this. 

## Get Started

Download to your Obsidian vault using the [BRAT](https://tfthacker.com/BRAT) plugin, which you can do the same way you download and install other Community Plugins. 

## Features

### Available Visualizations

- Word clouds

### Language Support

- English

### Commands

#### Make a word cloud for the current note

- Have a note already open
- Open the command palette and search for "word cloud"
- Select "Make a word cloud using this note"
- Wait a couple of seconds for some SVG code to get inserted at the top of the file. Warning: The SVG code may be lengthy AF, depending on the length of your note.

### Obsidian Publish support

Because the visualizations are not made using DataView or a similar plugin that relies on codeblocks, these visualizations are compatible with Obsidian Publish. 

### Privacy

After seeing a forum post about wanting more explicit privacy notices for plugins:

- This plugin does NOT keep any data for any purpose.
- This plugin DOES distribute your data to QuickChart.io in order to use its data visualization features. Please refer to their privacy policy. 

## Roadmap
- [ ] Insert after frontmatter when inserting at the top of the file.
- [ ] Command to insert at the cursor instead of the top of the file
- [ ] Setting to include or remove built-in stop words
- [ ] Setting to add your own stop words
- [ ] Add languages other than English (which ones I can figure out TBD)
- [ ] Setting to put SVG in its own file and embed in the current note
- [ ] Setting to save image as a png instead of an SVG
