m ?= fix
gitm:
	git add .
	git commit -m '$(m)'
	git push
