# Vanilla JS Slide full screen slide show for videos and images

## Why?

This is a scratch-your-own-itch project as I wanted a way to see images and videos full screen in my browser that loop. 

Preview and Quicklook on MacOS are awesome but their treatment of GIFs and the inability for Quicklook to loop videos annoyed me, so I wrote this. 

## Features

* Displays any video or image in a folder in the largest possible size without cropping
* Mouse or keyboard navigation (Arrow Left and right for back and forward, Space to toggle automatic advancing)
* Slide show option showing a new image every `x` seconds.
* Slide show waits for images to load and videos to be playable before advancing
* Stores the current position of the slide show. Next time you load the document it commences where it stopped last time.

## Usage

You can use the slideshow by giving it a container to create all the elements in, define the different settings of the `slideshow` object:

* `container`: a DOM reference to the HTML element the slide show should be added in
* `media`: an Array of images and videos to display
* `folder`: the folder containing these - this should be a child folder of one the slide show is in.
* `autoplay`: `yes` or `no` indicating if the slide show should start or not
* `speed`: time in milliseconds to advance to the next media item (f.e. 1000 for a second) 

```html
<div id="slideshow-container"></div>
<script>
  let slideshow = {
    container: '#slideshow-container',
    media: [
    'ball.mp4','dinowalk.mp4','dirty.mp4',
    'goldiejump.mp4','step.mp4','tippy.mp4','wag.mp4'
    ],
    folder: 'imgs/',
    autoplay: 'yes'
  }
</script>
<script src="slideshow.js"></script>
```

## Automating the media collection 

Currently I am using this on my hard drive running a local server and the `index.php` script. If you are using a Mac, PHP comes with the system. Go to the terminal, navigate to the folder where the slide show is and run: 

```
$ php -S localhost:8000

```
Then you can navigate in you browser to `localhost:8000` and the rest happens automatically. 

The `index.php` script lists all the current folders in the directory the script is in and gives you list of all of them. Clicking the link of the name starts the slide show with the current folder. Feel free to check the script, but there isn't much magic there.