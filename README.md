# Lumen

Web interface for controlling Hue devices

### Client

The client uses React and is the most important piece. Lumen was developed with the goal of being deployed as a static React site to be run completely client-side only.

### Server

The server is written in Go and serves a very specific and simple purpose. You'll only want to use it for a self-hosted and shared scenario. Meaning if you want a shared control panel (for example for using at home and having it available in your local network).
This can easily be achived by using the pre-built docker image.
