setup:
	python3 -m venv venv
	(\
	source venv/bin/activate ;\
	pip install legacy-cgi\
	)

run:
	(\
	source venv/bin/activate ;\
	python internal/server.py\
	)