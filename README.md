# DC
Projet for dachuang. Bulid MQTT communication between arm64  facilities. Make a lost and found weapp, power by this technology.  

Tips for how to use github on Deepin:  
install git:  
$ sudo apt install git-all  
set user:  
$ git config --global user.name "your name"  
$ git config --global user.email "your_email@youremail.com"  
SSH to github:  
$ ssh-keygen -t rsa  
$ cd ~/.ssh  
$ cat id_rsa.pub  
#copy the link and past on your github->setting->SSH  
test the link:  
$ ssh -T git@github.com  
clone DC:  
$ cd ~/.Desktop  
$ git clone git@github.com:JJLi0427/DC.git  
upadte code from remote:  
$ git pull  
push to DC:  
$ git add .  
$ git commit  
$ git push origin main
