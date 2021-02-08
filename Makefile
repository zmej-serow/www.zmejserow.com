push:
	git add .
	git commit -m '${m}'
	git push origin master

stabilize:
	ffmpeg -i '${i}' -vf vidstabdetect=shakiness=5:show=1 dummy.mp4
	ffmpeg -i '${i}' -vf vidstabtransform,unsharp=5:5:0.8:3:3:0.4 'stab-${i}'
	rm dummy.mp4
	rm transforms.trf
