# Newsletter-Server


01. <a href="#dependencies">Dependencies</a>
02. <a href="#quick-start">Quick Start</a>
03. <a href="#important">Important</a>
04. <a href="#how-to">How To</a>








<h2 id="dependencies">Dependencies</h2>

```bash
sudo npm i -g grunt-cli bower nodemon
```

<h2 id="quick-start">Quick Start</h2>

```bash
npm install && bower install
```


- Go to your app/views/HTMLnewsletter/
- Edit your newsletter.html :
- Replace nestlemail.bisystem.com/maggi/130327 by your Local IP+ express Port
- for example : 192.168.1.:3000


```bash
grunt start # grunts + runs the server
```

- Browse to http://localhost:3000/emailing/youremail@gmail.com
- The webservice will email you a newsletter if no error.




<h2 id="important">Very important to know</h2>

- Your express server will serve the images.
- So, you're testing device should be in the same network as your server. (Wifi Network, or local test).
- If you launch the grunt on your local machine, you'll be able to acces to your served images from the Frontend hot spot




<h2 id="how-to">How To</h2>

- Place your newsletter's HTML and images on 'app/views/HTMLnewsletter/'
	- newsletter.html
	- images/*.html

- Replace all you images link by the Ip corresponding to your machine + port your express is listenning on:
'./images' by 'http://10.0.2.55:3000'

- The build will:
	- Copy your images on public/images so it will be accessible.
	- Copy your images on public/images so it will be accessible.
	- Copy the html content of the email file 'newsletter.html'
	

- Grunt start

- Launch on your machine serving express



