# DC
Projet for dachuang. Bulid MQTT communication between arm64 facilities. Make a lost and found wechat miniprogram, power by this technology.  

## HOW TO USE GIT 
On Linux how to install git:  
`$ sudo apt install git-all`  
on windows you can download installer from <https://git-scm.com/>  

Set user:  
`$ git config --global user.name "your name"`  
`$ git config --global user.email "your_email@youremail.com"`  

SSH to github:  
`$ ssh-keygen -t rsa`  
`$ cd ~/.ssh`  
`$ cat id_rsa.pub`  

Then copy the link and past on your github->setting->SSH.  

Test the link to github:  
`$ ssh -T git@github.com`  

Clone DC to your computer:  
`$ cd ~/.Desktop`  
`$ git clone git@github.com:JJLi0427/DC.git`  

Upadte code from remote:  
`$ git pull`  
Attention: before each coding, make a pull  

Push to DC:  
`$ git add .`  
`$ git commit`  
`$ git push origin main`

## ABOUT GO
Go mod is a module management tool, it contains the source of your import file.  
How to make a mod:  
`go mod init xxx`  

Run go application with go mod:  
`go run ./xxx.go`  

Buid code for arm platform:  
for windows `GOOS=windows GOARCH=amd64 go build -o xxx xxx.go`  
for linux `GOOS=linux GOARCH=arm64 GOARM=7 go build -o xxx xxx.go` or `GOOS=linux GOARCH=arm GOARM=7 go build -o xxx xxx.go`

## ABOUT WXAPP
Download develop tool form <https://mp.weixin.qq.com/>, scan the QR code to login.  
Import the wxapp floder to open the project, use local develop to open it.  
wxapp/page floder contains all pages, each page need .wxml/.wxss/.js to complie.  
app.js/app.json/app.wxss are global UI or data setting for this program.  
Chage the coompile setting to compile the page you are developing at first.  
Use real machine debugging when finish coding.  

## HOW TO USE VSCODE TO REMOTE DEVELOP
Read this bolg and learn using vscode to connect server through SSH   
<https://blog.csdn.net/lijj0304/article/details/132559126?spm=1001.2014.3001.5502>


