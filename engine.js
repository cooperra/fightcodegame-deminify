/*! FightCode - v0.2.0
 * http://fightcodega.me/
 */
var __slice = [].slice;
var __hasProp = {}.hasOwnProperty;
var __extends = function (e, t) {
	function r() {
		this.constructor = e
	}

	for (var n in t)
		if (__hasProp.call(t, n))
			e[n] = t[n];

	r.prototype = t.prototype;
	e.prototype = new r;
	e.__super__ = t.prototype;
	return e;
};
var __indexOf = [].indexOf || function (e) {
	for (var t = 0, n = this.length; t < n; t++)
		if (t in this && this[t] === e)
			return t;
	return -1
};

var FightCodeEngine = {};
FightCodeEngine.create_fight = function () {
	var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d;
	o = 1;
	e = 1;
	u = Math.PI * 2;
	a = 180 / Math.PI;
	d = function (e) {
		return (e % 360 + 360) % 360
	};
	h = function () {
		function e(t, n) {
			this.x = t;
			this.y = n;
			this.x instanceof e && (this.y = this.x.y, this.x = this.x.x)
		}
		e.prototype.rotate = function (e, t) {
			var n, r, i, s;
			e = e * Math.PI / 180;
			r = Math.sin(e);
			n = Math.cos(e);
			i = this.x - t.x;
			s = this.y - t.y;
			this.x = i * n - s * r + t.x;
			this.y = i * r + s * n + t.y;
			return this;
		};
		e.prototype.module = function () {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		};
		e.prototype.projectTo = function (t) {
			var n, r, i;
			i = this.x * t.x + this.y * t.y;
			n = t.x * t.x + t.y * t.y;
			r = i / n;
			return new e(r * t.x, r * t.y);
		};
		e.prototype.dot = function (e) {
			return this.x * e.x + this.y * e.y
		};
		e.add = function (t, n) {
			return new e(t.x + n.x, t.y + n.y)
		};
		e.subtract = function (t, n) {
			return new e(t.x - n.x, t.y - n.y)
		};
		e.divide = function (t, n) {
			return new e(t.x / n, t.y / n)
		};
		e.multiply = function (t, n) {
			return new e(t.x * n, t.y * n)
		};
		return e;
	}();
	l = function () {
		function t(n) {
			if (this.constructor !== t) return new t(n);
			this.id = n.id;
			this.angle = d(n.rectangle.angle + 90);
			this.cannonRelativeAngle = d(n.cannonAngle + 90);
			this.cannonAbsoluteAngle = d(this.angle + this.cannonRelativeAngle);
			this.position = new h(n.rectangle.position);
			this.life = n.life;
			this.gunCoolDownTime = n.gunCoolDownTime;
			this.availableClones = n.availableClones;
			this.availableDisappears = n.availableDisappears;
			this.parentId = n.parentStatus ? n.parentStatus.id : null;
			this.arenaWidth = n.arena.width;
			this.arenaHeight = n.arena.height;
			this.queue = [];
			this.move = function (e, t) {
				if (e === 0) return;
				return this.queue.push({
					action: "move",
					direction: t,
					count: Math.abs(e) / o
				}), true
			};
			this.ahead = function (e) {
				return this.move(e, 1)
			};
			this.back = function (e) {
				return this.move(e, -1)
			};
			this.rotateCannon = function (t) {
				if (t === 0) return;
				return this.queue.push({
					action: "rotateCannon",
					direction: t,
					count: Math.abs(t) / e
				})
			};
			this.turnGunLeft = function (e) {
				return this.rotateCannon(-e)
			};
			this.turnGunRight = function (e) {
				return this.rotateCannon(e)
			};
			this.turn = function (t) {
				if (t === 0) return;
				return this.queue.push({
					action: "turn",
					direction: t,
					count: Math.abs(t) / e
				})
			};
			this.turnLeft = function (e) {
				return this.turn(-e)
			};
			this.turnRight = function (e) {
				return this.turn(e)
			};
			this.fire = function (e) {
				return this.queue.push({
					action: "fire"
				})
			};
			this.notify = function (e) {
				return this.queue.push({
					action: "notify",
					callback: e
				})
			};
			this.stop = function (e) {
				return this.queue = [{
						action: "stop"
					}
				]
			};
			this.clone = function () {
				return this.queue.push({
					action: "clone"
				})
			};
			this.disappear = function () {
				return this.queue.push({
					action: "disappear"
				})
			};
			this.log = function () {
				var e;
				return e = 1 <= arguments.length ? __slice.call(arguments, 0) : [], this.queue.push({
					action: "log",
					messages: e
				})
			};
			this.ignore = function (e) {
				return this.queue.push({
					action: "ignore",
					eventName: e
				})
			};
			this.listen = function (e) {
				return this.queue.push({
					action: "listen",
					eventName: e
				})
			}
		}
		return t
	}();
	t = function () {
		function e(e, t) {
			this.width = e;
			this.height = t;
			this.rectangle = new f(this.width / 2, this.height / 2, this.width, this.height);
		}
		return e
	}();
	s = function () {
		function e(e, t, n, r) {
			this.p1 = new h(e, t);
			this.p2 = new h(n, r);
		}
		return e
	}();
	f = function () {
		function e(e, t, n, r, i) {
			e == null && (e = 0);
			t == null && (t = 0);
			n == null && (n = 1);
			r == null && (r = 1);
			this.angle = i != null ? i : 0;
			this.position = new h(e, t);
			this.setDimension(n, r);
			this.updateCoords();
		}
		e.prototype.setAngle = function (e) {
			this.angle = d(e);
			return this.updateCoords();
		};
		e.prototype.setDimension = function (e, t) {
			this.dimension = {
				width: e,
				height: t
			};
			this.halfWidth = e / 2;
			this.halfHeight = t / 2;
			this.radius = Math.sqrt(this.halfWidth * this.halfWidth + this.halfHeight * this.halfHeight);
			this.minRadius = Math.min(this.halfWidth, this.halfHeight);
			return this.updateCoords();
		};
		e.prototype.setPosition = function (e, t) {
			this.position.x = e;
			this.position.y = t;
			return this.updateCoords();
		};
		e.prototype.incPosition = function (e, t) {
			this.position.x += e;
			this.position.y += t;
			return this.updateCoords();
		};
		e.prototype.updateCoords = function () {
			var e, t, n, r;
			r = this.position.y - this.halfHeight;
			t = this.position.x - this.halfWidth;
			e = this.position.y + this.halfHeight;
			n = this.position.x + this.halfWidth;
			this.upperRight = (new h(n, r)).rotate(this.angle, this.position);
			this.upperLeft = (new h(t, r)).rotate(this.angle, this.position);
			this.lowerLeft = (new h(t, e)).rotate(this.angle, this.position);
			return this.lowerRight = (new h(n, e)).rotate(this.angle, this.position);
		};
		e.prototype.containingCollisionAngle = function (e) {
			var t;
			t = this.minRadius;
			if (this.position.x - t <= e.upperLeft.x) {
				return 270;
			} else if (this.position.x + t >= e.lowerRight.x) {
				return 90;
			} else if (this.position.y - t <= e.upperLeft.y) {
				return 360;
			} else if (this.position.y + t >= e.lowerRight.y) {
				return 180;
			} else {
				return false;
			}
		};
		e.prototype.intersects = function (e) {
			var t, n, r, i, s;
			r = h.subtract(this.position, e.position).module();
			if (r > this.radius + e.radius) return false;
			n = [
				h.subtract(this.upperRight, this.upperLeft),
				h.subtract(this.upperRight, this.lowerRight),
				h.subtract(e.upperRight, e.upperLeft),
				h.subtract(e.upperRight, e.lowerRight)
			];
			for (i = 0, s = n.length; i < s; i++) {
				t = n[i];
				if (!this.isAxisCollision(e, t)) return false
			}
			return true
		};
		e.prototype.isAxisCollision = function (e, t) {
			var n, r, i, s, o, u;
			o = [
				this.generateScalar(this.upperLeft, t),
				this.generateScalar(this.upperRight, t),
				this.generateScalar(this.lowerLeft, t),
				this.generateScalar(this.lowerRight, t)
			];
			u = [
				this.generateScalar(e.upperLeft, t),
				this.generateScalar(e.upperRight, t),
				this.generateScalar(e.lowerLeft, t),
				this.generateScalar(e.lowerRight, t)
			];
			i = Math.min.apply(Math, o);
			n = Math.max.apply(Math, o);
			s = Math.min.apply(Math, u);
			r = Math.max.apply(Math, u);
			return (i <= r && n >= r) || (s <= n && r >= n);
		};
		e.prototype.generateScalar = function (e, t) {
			var n;
			n = e.projectTo(t);
			return t.x * n.x + t.y * n.y;
		};
		return e;
	}();
	r = function () {
		function e() {
			this.id = "element" + c.id++, this.rectangle = new f
		}
		return e.id = 1, e.prototype.isAlive = function () {
			return true
		}, e
	}();
	p = function (e) {
		function t(e, n, r, i) {
			t.__super__.constructor.call(this);
			this.line = new s(e, n, r, i);
		}
		return __extends(t, e), t
	}(r);
	n = function (e) {
		function t(e) {
			var n, r, i;
			this.robotStatus = e;
			t.__super__.constructor.call(this);
			this.rectangle.setAngle(this.robotStatus.rectangle.angle + this.robotStatus.cannonAngle);
			n = this.rectangle.angle * Math.PI / 180;
			this.sinAngle = Math.sin(n);
			this.cosAngle = Math.cos(n);
			r = this.cosAngle * (this.robotStatus.rectangle.dimension.width / 2);
			i = this.sinAngle * (this.robotStatus.rectangle.dimension.height / 2);
			this.rectangle.setPosition(this.robotStatus.rectangle.position.x + r, this.robotStatus.rectangle.position.y + i);
			this.rectangle.setDimension(2, 2);
			this.speed = 2;
			this.strength = 10;
			this.running = true;
		}
		__extends(t, e);
		t.prototype.isIdle = function () {
			return false
		};
		t.prototype.isAlive = function () {
			return this.running
		};
		t.prototype.runItem = function () {
			this.previousPosition = new h(this.rectangle.position);
			this.rectangle.incPosition(this.cosAngle * this.speed, this.sinAngle * this.speed);
			return null;
		};
		t.prototype.destroy = function () {
			return this.running = false
		};
		t.prototype.rollbackAfterCollision = function () {
			if (this.previousPosition) return this.rectangle.setPosition(this.previousPosition.x, this.previousPosition.y)
		};
		t.prototype.updateQueue = function () {
		};
		return t;
	}(r);
	c = function (t) {
		function r(e, t) {
			this.robot = e;
			this.arena = t;
			r.__super__.constructor.call(this);
			this._invisibleRounds = 200;
			this.life = 100;
			this.cannonAngle = 0;
			this.rectangle.setDimension(27, 24);
			this.baseScanWaitTime = 50;
			this.baseGunCoolDownTime = 50;
			this.scanWaitTime = 0;
			this.gunCoolDownTime = 0;
			this.availableClones = 1;
			this.availableDisappears = 1;
			this.queue = [];
			this.clones = [];
			this.parentStatus = null;
			this.bulletsFired = 0;
			this.bulletsHit = 0;
			this.bulletsTaken = 0;
			this.deathIdx = null;
			this.enemiesKilled = 0;
			this.friendsKilled = 0;
			this.ignoredEvents = {};
			this.accidentalCollisions = {};
			this.isInvisible = false;
		}
		__extends(r, t);
		r.deathOrder = 1;
		r.prototype.instantiateRobot = function () {
			var e;
			e = new l(this);
			this.robot.instance = new this.robot.constructor(e);
			return this.updateQueue(e);
		};
		r.prototype.clone = function () {
			var e;
			e = new r(this.robot, this.arena);
			e.rectangle.setAngle(this.rectangle.angle);
			e.rectangle.setPosition(this.rectangle.position.x, this.rectangle.position.y);
			e.life = this.life / 4;
			e.availableClones = 0;
			e.parentStatus = this;
			this.clones.push(e);
			return e;
		};
		r.prototype.disappear = function () {
			this.isInvisible = true, this.pushEventToLog({
				type: "beginInvisibility",
				id: this.id
			})
		};
		r.prototype.decInvisibleRounds = function () {
			this._invisibleRounds--, this._invisibleRounds < 0 && (this.isInvisible = false, this.pushEventToLog({
				type: "endInvisibility",
				id: this.id
			}))
		};
		r.prototype.stats = function () {
			return {
				bulletsFired: this.clones.reduce(function (e, t) {
					return e + t.bulletsFired
				}, this.bulletsFired),
				bulletsHit: this.clones.reduce(function (e, t) {
					return e + t.bulletsHit
				}, this.bulletsHit),
				bulletsTaken: this.clones.reduce(function (e, t) {
					return e + t.bulletsTaken
				}, this.bulletsTaken),
				enemiesKilled: this.clones.reduce(function (e, t) {
					return e + t.enemiesKilled
				}, this.enemiesKilled),
				friendsKilled: this.clones.reduce(function (e, t) {
					return e + t.friendsKilled
				}, this.friendsKilled)
			}
		};
		r.prototype.getAccidentalCollisions = function () {
			var e;
			e = this.accidentalCollisions;
			this.accidentalCollisions = {};
			return e;
		};
		r.prototype.addAccidentalCollision = function (e) {
			return this.accidentalCollisions[e.id] = true
		};
		r.prototype.isClone = function () {
			return !!this.parentStatus
		};
		r.prototype.isAlive = function () {
			return this.life > 0 && (this.parentStatus === null || this.parentStatus.life > 0)
		};
		r.prototype.isIdle = function () {
			return this.queue.length === 0
		};
		r.prototype.takeHit = function (e) {
			var t;
			this.bulletsTaken++;
			this.life -= e.strength;
			e.destroy();
			e.robotStatus.bulletsHit += 1;
			if (!this.isAlive()) {
				this.deathIdx = r.deathOrder++;
				if (e.robotStatus.parentStatus === this || (t = e.robotStatus, __indexOf.call(this.clones, t) >= 0)) {
					return e.robotStatus.friendsKilled += 1;
				} else {
					return e.robotStatus.enemiesKilled += 1;
				}
			}
		};
		r.prototype.rollbackAfterCollision = function () {
			this.previousPosition && this.rectangle.setPosition(this.previousPosition.x, this.previousPosition.y);
			if (this.previousAngle) return this.rectangle.setAngle(this.previousAngle)
		};
		r.prototype.cannonTotalAngle = function () {
			return d(this.rectangle.angle + this.cannonAngle)
		};
		r.prototype.canScan = function () {
			return this.scanWaitTime === 0
		};
		r.prototype.tickScan = function () {
			if (this.scanWaitTime > 0) return this.scanWaitTime -= 1
		};
		r.prototype.preventScan = function () {
			return this.scanWaitTime = this.baseScanWaitTime
		};
		r.prototype.abortCurrentMovement = function () {
			if (this.queue.length > 0 && this.queue[0].started) return this.queue.shift()
		};
		r.prototype.runItem = function () {
			var t, dir, item, s, u;
			this.gunCoolDownTime > 0 && this.gunCoolDownTime--;
			item = this.queue.shift();
			u = false;
			while (item) {
				switch (item.action) {
				case "ignore":
					this.ignoredEvents[item.eventName] = true;
					break;
				case "listen":
					delete this.ignoredEvents[item.eventName];
					break;
				case "log":
					this.pushEventToLog({
						type: "log",
						messages: item.messages.join("\n"),
						id: this.id
					});
					break;
				default:
					u = true
				}
				if (u) break;
				item = this.queue.shift()
			}
			if (!item) return;
			if ("count" in item) {
				item.started = true;
				item.count--;
				if (item.count > 0) {
					this.queue.unshift(item);
				}
			}
			dir = 1;
			if (item.direction && item.direction < 0) {
				dir = -1;
			}
			this.previousPosition = null;
			this.previousAngle = null;
			this.previousCannonAngle = null;
			switch (item.action) {
			case "move":
				s = this.rectangle.angle * Math.PI / 180;
				this.previousPosition = new h(this.rectangle.position);
				this.rectangle.incPosition(Math.cos(s) * o * dir, Math.sin(s) * o * dir);
				break;
			case "rotateCannon":
				this.previousCannonAngle = this.cannonAngle;
				this.cannonAngle += e * dir;
				this.cannonAngle = d(this.cannonAngle);
				break;
			case "turn":
				this.previousAngle = this.rectangle.angle;
				t = this.previousAngle + e * dir;
				this.rectangle.setAngle(t);
				break;
			case "fire":
				if (this.gunCoolDownTime !== 0) return;
				this.gunCoolDownTime = this.baseGunCoolDownTime;
				this.bulletsFired += 1;
				return new n(this);
			case "clone":
				if (!this.availableClones) return;
				this.availableClones--;
				return this.clone();
			case "disappear":
				if (!this.availableDisappears) return;
				this.availableDisappears--;
				return this.disappear();
			case "notify":
				item.callback && item.callback()
			}
			return null
		};
		r.prototype.updateQueue = function (e) {
			if (e.queue.length > 0 && e.queue[0].action === "stop") {
				return this.queue = e.queue.slice(1);
			} else {
				return this.queue = e.queue.concat(this.queue);
			}
		};
		r.prototype.pushObjectToLog = function (e) {
			if (this.keepTrackOfEvents) return this.roundLog.objects.push(e)
		};
		r.prototype.pushEventToLog = function (e) {
			if (this.keepTrackOfEvents) return this.roundLog.events.push(e)
		};
		return r;
	}(r);
	i = function () {
		function e() {
			var e, n, r, i, s, o, u, a, f, l, h;
			a = arguments[0];
			e = arguments[1];
			r = arguments[2];
			i = arguments[3];
			n = arguments[4];
			u = 6 <= arguments.length ? __slice.call(arguments, 5) : [];
			this.maxTurns = r;
			this.randomFunc = i;
			this.keepTrackOfEvents = n;
			this.round = 0;
			this.arena = new t(a, e);
			this.robotsStatus = function () {
				var e, t, n;
				n = [];
				for (e = 0, t = u.length; e < t; e++) {
					s = u[e];
					n.push(new c(s, this.arena));
				}
				return n
			}.call(this);
			this.deadStatuses = [];
			this.initPositions();
			h = this.robotsStatus;
			for (f = 0, l = h.length; f < l; f++) {
				o = h[f];
				o.keepTrackOfEvents = this.keepTrackOfEvents;
				o.instantiateRobot();
			}
		}
		e.prototype.initPositions = function () {
			var e, t, n, r, i, s, o, u, a;
			u = this.robotsStatus;
			a = [];
			for (s = 0, o = u.length; s < o; s++) {
				n = u[s];
				t = n.robot.rectangle;
				if (t) {
					n.rectangle.setPosition(t.position.x, t.position.y), a.push(n.rectangle.setAngle(t.angle));
				} else {
					r = Math.floor(this.randomFunc() * this.arena.rectangle.dimension.width);
					i = Math.floor(this.randomFunc() * this.arena.rectangle.dimension.height);
					e = Math.floor(this.randomFunc() * 360);
					n.rectangle.setAngle(e);
					n.rectangle.setPosition(r, i);
					this.findEmptyPosition(n);
					n.robot.rectangle = {};
					n.robot.rectangle.position = new h(n.rectangle.position);
					a.push(n.robot.rectangle.angle = n.rectangle.angle));
				}
			}
			return a
		};
		e.prototype.isDraw = function () {
			return this.round > this.maxTurns
		};
		e.prototype.safeCall = function () {
			var e, t, n;
			t = arguments[0];
			e = arguments[1];
			n = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
			if (!t[e]) return;
			try {
				return t[e].apply(t, n)
			} catch (r) {}
		};
		e.prototype.intersectsAnything = function (e) {
			var t, n, r, i;
			if (e.rectangle.containingCollisionAngle(this.arena.rectangle)) return true;
			i = this.robotsStatus;
			for (n = 0, r = i.length; n < r; n++) {
				t = i[n];
				if (t === e || !t.isAlive()) continue;
				if (e.rectangle.intersects(t.rectangle)) return true
			}
			return false
		};
		e.prototype.findEmptyPosition = function (e) {
			var t, n, r, i, s, o, u, a, f, l, c, h, p, d;
			n = this.arena.width;
			t = this.arena.height;
			a = e.rectangle.dimension.width;
			u = e.rectangle.dimension.height;
			r = e.rectangle.position.x;
			i = e.rectangle.position.y;
			for (l = c = 0, p = t - 1; 0 <= p ? c <= p : c >= p; l = c += u) {
				for (f = h = 0, d = n - 1; 0 <= d ? h <= d : h >= d; f = h += a) {
					o = (l + i + u) % t;
					s = (f + r + a) % n;
					e.rectangle.setPosition(s, o);
					if (!this.intersectsAnything(e))
						return e
				}
			}
			return false
		};
		e.prototype.checkCollision = function (e) {
			var t, r, i, s, o, u, a, f, p, v, m, g, y, b, w;
			r = e instanceof c ? new l(e) : null;
			p = e.rectangle.containingCollisionAngle(this.arena.rectangle);
			p && (e.rollbackAfterCollision(), e instanceof n ? (e.destroy(), this.pushEventToLog({
				type: "exploded",
				id: e.id
			})) : (i = d(p - e.rectangle.angle - 90), i > 180 && (i -= 360), e.abortCurrentMovement(), e.ignoredEvents.onWallCollision || (r.ignore("onWallCollision"), this.safeCall(e.robot.instance, "onWallCollision", {
				robot: r,
				bearing: i
			}), r.listen("onWallCollision"))));
			if (e instanceof n)
				return r;
			t = e.getAccidentalCollisions();
			b = this.robotsStatus;
			for (v = 0, g = b.length; v < g; v++) {
				a = b[v];
				if (a === e || !a.isAlive()) continue;
				u = a instanceof c;
				if (e.rectangle.intersects(a.rectangle)) {
					o = "onRobotCollision";
					if (a instanceof n) {
						i = d(a.rectangle.angle + 180 - e.rectangle.angle);
						if (a.robotStatus === e) continue;
						o = "onHitByBullet", e.takeHit(a), this.pushEventToLog({
							type: "exploded",
							id: a.id
						});
						if (!e.isAlive()) {
							this.pushEventToLog({
								type: "dead",
								id: e.id
							}), w = e.clones;
							for (m = 0, y = w.length; m < y; m++) s = w[m], this.pushEventToLog({
									type: "dead",
									id: s.id
								})
						}
					} else f = h.subtract(a.rectangle.position, e.rectangle.position), i = d(Math.atan2(f.y, f.x) * 180 / Math.PI - e.rectangle.angle), e.rollbackAfterCollision(), e.abortCurrentMovement();
					i > 180 && (i -= 360), e.ignoredEvents[o] || (r.ignore(o), this.safeCall(e.robot.instance, o, {
						robot: r,
						bearing: i,
						collidedRobot: u ? this.basicEnemyInfo(a) : null,
						myFault: !! u
					}), r.listen(o)), u && a.addAccidentalCollision(e)
				} else u && t[a.id] && (e.ignoredEvents[o] || (f = h.subtract(a.rectangle.position, e.rectangle.position), i = d(Math.atan2(f.y, f.x) * 180 / Math.PI - e.rectangle.angle), i > 180 && (i -= 360), r.ignore(o), this.safeCall(e.robot.instance, o, {
						robot: r,
						bearing: i,
						collidedRobot: this.basicEnemyInfo(a),
						myFault: false
					}), r.listen(o)))
			}
			return r
		};
		e.prototype.checkSight = function (e) {
			var t, n, r, i, s, o, u, a, p, d, v, m;
			t = new l(e);
			e.tickScan();
			if (!e.canScan())
				return t;
			if (e.ignoredEvents.onScannedRobot)
				return t;
			p = 2e3;
			u = 1;
			n = new h(e.rectangle.position.x + p / 2, e.rectangle.position.y - u / 2);
			n.rotate(e.cannonTotalAngle(), e.rectangle.position);
			a = new f(n.x, n.y, p, u, e.cannonTotalAngle());
			s = null;
			i = Infinity;
			m = this.robotsStatus;
			for (d = 0, v = m.length; d < v; d++) {
				o = m[d];
				if (o === e || !o.isAlive())
					continue;
				if (!(o instanceof c))
					continue;
				if (a.intersects(o.rectangle)) {
					r = h.subtract(o.rectangle.position, e.rectangle.position).module();
					if (r < i) {
						s = o;
						i = r;
					}
				}
			}
			if (s && !s.isInvisible) {
				e.preventScan();
				t.ignore("onScannedRobot");
				this.safeCall(e.robot.instance, "onScannedRobot", {
					robot: t,
					scannedRobot: this.basicEnemyInfo(s)
				});
				t.listen("onScannedRobot");
				this.pushEventToLog({
					type: "onScannedRobot",
					id: e.id
				});
			}
			return t;
		};
		e.prototype.basicEnemyInfo = function (e) {
			return {
				id: e.id,
				position: new h(e.rectangle.position),
				angle: e.rectangle.angle,
				cannonAngle: e.cannonAngle,
				life: e.life,
				parentId: e.parentStatus ? e.parentStatus.id : null
			}
		};
		e.prototype.pushObjectToLog = function (e) {
			if (this.keepTrackOfEvents) return this.roundLog.objects.push(e)
		};
		e.prototype.pushEventToLog = function (e) {
			if (this.keepTrackOfEvents) return this.roundLog.events.push(e)
		};
		e.prototype.fight = function () {
			var e, t, n, r, i, s, o, u, a, f, h, p, d, v, m, g, y;
			t = this.robotsStatus.length;
			n = [];
			while (t > 1 && !this.isDraw()) {
				this.round++;
				n.push(this.roundLog = {
					round: this.round,
					objects: [],
					events: []
				});
				t = 0;
				g = this.robotsStatus;
				for (f = 0, d = g.length; f < d; f++) {
					a = g[f];
					if (!a.isAlive())
						continue;
					a.roundLog = this.roundLog;
					this.pushObjectToLog({
						type: a instanceof c ? "tank" : "bullet",
						id: a.id,
						name: a instanceof c ? a.robot.name : "bullet",
						color: a instanceof c ? a.robot.color : null,
						isClone: a instanceof c ? a.isClone() : false,
						position: {
							x: a.rectangle.position.x,
							y: a.rectangle.position.y
						},
						dimension: {
							width: a.rectangle.dimension.width,
							height: a.rectangle.dimension.height
						},
						life: a.life,
						angle: a.rectangle.angle,
						cannonAngle: a.cannonAngle,
						parentId: a.parentStatus && a.parentStatus.id
					});
					if (a.isIdle()) {
						e = new l(a);
						this.safeCall(a.robot.instance, "onIdle", {
							robot: e
						});
						a.updateQueue(e);
					}
					if (a.isInvisible) {
						a.decInvisibleRounds();
					}
					r = a.runItem();
					if (r) {
						this.robotsStatus.push(r);
						if (r instanceof c) {
							this.findEmptyPosition(r);
							this.pushEventToLog({
								type: "cloned",
								id: a.id,
								cloneId: r.id
							});
						}
					}
					e = this.checkCollision(a);
					if (e) {
						a.updateQueue(e);
					}
					if (a instanceof c && !a.isClone()) {
						t++;
					}
				}
				y = this.robotsStatus;
				for (h = 0, v = y.length; h < v; h++) {
					a = y[h];
					if (!(a.isAlive() && a instanceof c))
						continue;
					e = this.checkSight(a);
					a.updateQueue(e);
				}
				if (this.roundLogCallback) {
					this.roundLogCallback(this.roundLog);
				}
			}
			s = this.robotsStatus.filter(function (e) {
				return e instanceof c && !e.isClone()
			});
			o = s.sort(function (e, t) {
				var n, r;
				return n = e.deathIdx ? e.deathIdx : e.life * 1e3, r = t.deathIdx ? t.deathIdx : t.life * 1e3, r - n
			});
			for (p = 0, m = o.length; p < m; p++) {
				i = o[p];
				u = i.stats = i.stats();
			}
			return {
				isDraw: this.isDraw(),
				robots: o,
				result: n
			}
		};
		return e;
	}();
	return function () {
		var e, t, n, r, s, o, u, a, f;
		f = arguments[0];
		t = arguments[1];
		r = arguments[2];
		s = arguments[3];
		n = arguments[4];
		a = arguments[5];
		u = 7 <= arguments.length ? __slice.call(arguments, 6) : [];
		e = function (e, t, n) {
			n.prototype = e.prototype;
			var r = new n,
				i = e.apply(r, t),
				s = typeof i;
			return s == "object" || s == "function" ? i || r : r
		}(i, [f, t, r, s, n].concat(__slice.call(u)), function () {});
		a && (e.roundLogCallback = a);
		o = e.fight();
		return o;
	};
}();

var SampleRobot = function () {
	function e() {}
	e.prototype.onIdle = function (e) {
		var t;
		return t = e.robot, t.ahead(100), t.rotateCannon(360), t.back(100), t.rotateCannon(360)
	};
	e.prototype.onRobotCollision = function (e) {
		return console.log("onRobotCollision", e)
	};
	e.prototype.onWallCollision = function (e) {
	};
	e.prototype.onScannedRobot = function (e) {
		var t;
		return t = e.robot, t.fire(1)
	};
	e.prototype.onHitByBullet = function (e) {
		var t;
		return t = e.robot, t.turn(e.bulletBearing)
	};
	return e;
}();
