.PHONY: build image

COUNT := $(shell git rev-list --all --count)
VERSION:= 1.0.1.$(COUNT)
BRANCH:=$(shell git rev-parse --abbrev-ref HEAD)
build:
	npm run build
clean:
	@echo "=== removing old build dir ===="
	rm -rf build


image:
	make clean
	npm run build
	docker build -t vengagedockerhub/json-form-builder:$(BRANCH)-$(VERSION) .
	docker push vengagedockerhub/json-form-builder:$(BRANCH)-$(VERSION)

