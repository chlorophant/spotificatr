.PHONY: build clean down start tail up

COUNT?=0

build:
	docker-compose -f docker-compose.yml build --parallel --force-rm

clean:
	docker-compose -f docker-compose.yml down -v --remove-orphans --rmi local
	docker rm $(docker ps -aq) 2>/dev/null || true
	docker image prune -f

down:
	docker-compose -f docker-compose.yml down

tail:
	docker-compose -f docker-compose.yml logs -f --tail ${COUNT} ${SERVICE}

up:
	docker-compose up -d
