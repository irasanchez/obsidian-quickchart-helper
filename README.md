# Obsidian QuickChart Helper

This is a tool I am making to make it easier to put data visualizations in my notes, using data from my notes. It uses the QuickChart API to generate an svg or png to insert into the note. 

It's not even alpha let alone beta, so please exercise patience and report issues if you choose to install this now. 

This currently only makes a word cloud using the current note. It removes links, emails, punctuation, and stop words automatically. There currently is no Settings page to adjust this. 

## Features

### Available Visualizations

- Word clouds
- More visualizations coming soon...

### Language Support

- English
- More languages coming soon...

### Commands

#### Make a word cloud for the current note

- Have a note already open
- Open the command palette and search for "word cloud"
- Select "Make a word cloud using this note"
- Wait a couple of seconds for some SVG code to get inserted at the top of the file. Warning: The SVG code may be lengthy AF, depending on the length of your note.

### Obsidian Publish support

Because the visualizations are not made using DataView or a similar plugin that relies on codeblocks, these visualizations are compatible with Obsidian Publish. 
