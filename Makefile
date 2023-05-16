# make localrun, запускать из www.zmejserow.com, а то мало ли где rm -rf стрельнет
localrun:
	rm -rf ./_site
	eleventy --serve

# make push m="название коммита"
push:
	git add .
	git commit -m '${m}'
	git push origin master

stabilize:
	ffmpeg -i '${i}' -vf vidstabdetect=shakiness=5:show=1 dummy.mp4
	ffmpeg -i '${i}' -vf vidstabtransform,unsharp=5:5:0.8:3:3:0.4 'stab-${i}'
	rm dummy.mp4
	rm transforms.trf

# make resize i="walks/brevet-200-nis/*jpg"
resize:
	mogrify -quality 70 -resize 1800\> '${i}'

