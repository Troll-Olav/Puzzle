/*!
 * VERSION: 0.9.0
 * DATE: 2013-10-21
 * JavaScript (also available in ActionScript 3 and 2)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * ThrowPropsPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue || (window._gsQueue = [])).push( function() {

	"use strict";

	window._gsDefine("plugins.ThrowPropsPlugin", ["plugins.TweenPlugin", "TweenLite", "easing.Ease", "utils.VelocityTracker"], function(TweenPlugin, TweenLite, Ease, VelocityTracker) {
		
		var ThrowPropsPlugin = function(props, priority) {
				TweenPlugin.call(this, "throwProps");
				this._overwriteProps.length = 0;
			},
			_max = 999999999999999,
			_transforms = {x:1,y:1,z:2,scale:1,scaleX:1,scaleY:1,rotation:1,rotationZ:1,rotationX:2,rotationY:2,skewX:1,skewY:1},
			_getClosest = function(n, values, max, min) {
				var i = values.length,
					closest = 0,
					absDif = _max,
					val, dif;
				while (--i > -1) {
					val = values[i];
					dif = val - n;
					if (dif < 0) {
						dif = -dif;
					}
					if (dif < absDif && val >= min && val <= max) {
						closest = i;
						absDif = dif;
					}
				}
				return values[closest];
			},
			_parseEnd = function(curProp, end, max, min) {
				if (curProp.end === "auto") {
					return curProp;
				}
				max = isNaN(max) ? _max : max;
				min = isNaN(min) ? -_max : min;
				var adjustedEnd = (typeof(curProp.end) === "function") ? curProp.end(end) : (curProp.end instanceof Array) ? _getClosest(end, curProp.end, max, min) : Number(curProp.end);
				if (adjustedEnd > max) {
					adjustedEnd = max;
				} else if (adjustedEnd < min) {
					adjustedEnd = min;
				}
				return {max:adjustedEnd, min:adjustedEnd};
			},
			_calculateChange = ThrowPropsPlugin.calculateChange = function(velocity, ease, duration, checkpoint) {
				if (checkpoint == null) {
					checkpoint = 0.05;
				}
				var e = (ease instanceof Ease) ? ease : (!ease) ? TweenLite.defaultEase : new Ease(ease);
				return (duration * checkpoint * velocity) / e.getRatio(checkpoint);
			},
			_calculateDuration = ThrowPropsPlugin.calculateDuration = function(start, end, velocity, ease, checkpoint) {
				checkpoint = checkpoint || 0.05;
				var e = (ease instanceof Ease) ? ease : (!ease) ? TweenLite.defaultEase : new Ease(ease);
				return Math.abs( (end - start) * e.getRatio(checkpoint) / velocity / checkpoint );
			},
			_calculateTweenDuration = ThrowPropsPlugin.calculateTweenDuration = function(target, vars, maxDuration, minDuration, overshootTolerance) {
				if (typeof(target) === "string") {
					target = TweenLite.selector(target);
				}
				if (!target) {
					return 0;
				}
				if (maxDuration == null) {
					maxDuration = 10;
				}
				if (minDuration == null) {
					minDuration = 0.2;
				}
				if (overshootTolerance == null) {
					overshootTolerance = 1;
				}
				if (target.length) {
					target = target[0] || target;
				}
				var duration = 0,
					clippedDuration = 9999999999,
					throwPropsVars = vars.throwProps || vars,
					ease = (vars.ease instanceof Ease) ? vars.ease : (!vars.ease) ? TweenLite.defaultEase : new Ease(vars.ease),
					checkpoint = isNaN(throwPropsVars.checkpoint) ? 0.05 : Number(throwPropsVars.checkpoint),
					resistance = isNaN(throwPropsVars.resistance) ? ThrowPropsPlugin.defaultResistance : Number(throwPropsVars.resistance),
					p, curProp, curDuration, curVelocity, curResistance, curVal, end, curClippedDuration, tracker, unitFactor;

				for (p in throwPropsVars) {

					if (p !== "resistance" && p !== "checkpoint") {
						curProp = throwPropsVars[p];
						if (typeof(curProp) !== "object") {
							tracker = tracker || VelocityTracker.getByTarget(target);
							if (tracker && tracker.isTrackingProp(p)) {
								curProp = (typeof(curProp) === "number") ? {velocity:curProp} : {velocity:tracker.getVelocity(p)}; //if we're tracking this property, we should use the tracking velocity and then use the numeric value that was passed in as the min and max so that it tweens exactly there.
							} else {
								curVelocity = Number(curProp) || 0;
								curDuration = (curVelocity * resistance > 0) ? curVelocity / resistance : curVelocity / -resistance;
							}
						}
						if (typeof(curProp) === "object") {
							if (curProp.velocity !== undefined && typeof(curProp.velocity) === "number") {
								curVelocity = Number(curProp.velocity) || 0;
							} else {
								tracker = tracker || VelocityTracker.getByTarget(target);
								curVelocity =  (tracker && tracker.isTrackingProp(p)) ? tracker.getVelocity(p) : 0;
							}
							curResistance = isNaN(curProp.resistance) ? resistance : Number(curProp.resistance);
							curDuration = (curVelocity * curResistance > 0) ? curVelocity / curResistance : curVelocity / -curResistance;
							curVal = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() : target[p] || 0;
							end = curVal + _calculateChange(curVelocity, ease, curDuration, checkpoint);
							if (curProp.end !== undefined) {
								curProp = _parseEnd(curProp, end, curProp.max, curProp.min);
							}
							if (curProp.max !== undefined && end > Number(curProp.max)) {
								unitFactor = curProp.unitFactor || 1; //some values are measured in special units like radians in which case our thresholds need to be adjusted accordingly.
								//if the value is already exceeding the max or the velocity is too low, the duration can end up being uncomfortably long but in most situations, users want the snapping to occur relatively quickly (0.75 seconds), so we implement a cap here to make things more intuitive. If the max and min match, it means we're animating to a particular value and we don't want to shorten the time unless the velocity is really slow. Example: a rotation where the start and natural end value are less than the snapping spot, but the natural end is pretty close to the snap.
								curClippedDuration = ((curVal > curProp.max && curProp.min !== curProp.max) || (curVelocity * unitFactor > -15 && curVelocity * unitFactor < 45)) ? (minDuration + (maxDuration - minDuration) * 0.1) : _calculateDuration(curVal, curProp.max, curVelocity, ease, checkpoint);
								if (curClippedDuration + overshootTolerance < clippedDuration) {
									clippedDuration = curClippedDuration + overshootTolerance;
								}

							} else if (curProp.min !== undefined && end < Number(curProp.min)) {
								unitFactor = curProp.unitFactor || 1; //some values are measured in special units like radians in which case our thresholds need to be adjusted accordingly.
								//if the value is already exceeding the min or if the velocity is too low, the duration can end up being uncomfortably long but in most situations, users want the snapping to occur relatively quickly (0.75 seconds), so we implement a cap here to make things more intuitive.
								curClippedDuration = ((curVal < curProp.min && curProp.min !== curProp.max) || (curVelocity * unitFactor > -45 && curVelocity * unitFactor < 15)) ? (minDuration + (maxDuration - minDuration) * 0.1) : _calculateDuration(curVal, curProp.min, curVelocity, ease, checkpoint);
								if (curClippedDuration + overshootTolerance < clippedDuration) {
									clippedDuration = curClippedDuration + overshootTolerance;
								}
							}

							if (curClippedDuration > duration) {
								duration = curClippedDuration;
							}
						}

						if (curDuration > duration) {
							duration = curDuration;
						}

					}
				}
				if (duration > clippedDuration) {
					duration = clippedDuration;
				}
				if (duration > maxDuration) {
					return maxDuration;
				} else if (duration < minDuration) {
					return minDuration;
				}
				return duration;
			},
			p = ThrowPropsPlugin.prototype = new TweenPlugin("throwProps"),
			_cssProxy, _cssVars, _last, _lastValue; //these serve as a cache of sorts, recording the last css-related proxy and the throwProps vars that get calculated in the _cssRegister() method. This allows us to grab them in the ThrowPropsPlugin.to() function and calculate the duration. Of course we could have structured things in a more "clean" fashion, but performance is of paramount importance.
			


		p.constructor = ThrowPropsPlugin;
		ThrowPropsPlugin.version = "0.9.0";
		ThrowPropsPlugin.API = 2;
		ThrowPropsPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		ThrowPropsPlugin.defaultResistance = 100;

		ThrowPropsPlugin.track = function(target, props, types) {
			return VelocityTracker.track(target, props, types);
		};

		ThrowPropsPlugin.untrack = function(target, props) {
			VelocityTracker.untrack(target, props);
		};

		ThrowPropsPlugin.isTracking = function(target, prop) {
			return VelocityTracker.isTracking(target, prop);
		};

		ThrowPropsPlugin.getVelocity = function(target, prop) {
			var vt = VelocityTracker.getByTarget(target);
			return vt ? vt.getVelocity(prop) : NaN;
		};

		ThrowPropsPlugin._cssRegister = function() {
			var CSSPlugin = (window.GreenSockGlobals || window).com.greensock.plugins.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("throwProps", {parser:function(t, e, prop, cssp, pt, plugin) {
				plugin = new ThrowPropsPlugin();
				var velocities = {},
					min = {},
					max = {},
					end = {},
					res = {},
					hasResistance, val, p, data, tracker;
				_cssVars = {};
				for (p in e) {
					if (p !== "resistance") {
						val = e[p];
						if (typeof(val) === "object") {
							if (val.velocity !== undefined && typeof(val.velocity) === "number") {
								velocities[p] = Number(val.velocity) || 0;
							} else {
								tracker = tracker || VelocityTracker.getByTarget(t);
								velocities[p] = (tracker && tracker.isTrackingProp(p)) ? tracker.getVelocity(p) : 0; //rotational values are actually converted to radians in CSSPlugin, but our tracking velocity is in radians already, so make it into degrees to avoid a funky conversion
							}
							if (val.end !== undefined) {
								end[p] = val.end;
							}
							if (val.min !== undefined) {
								min[p] = val.min;
							}
							if (val.max !== undefined) {
								max[p] = val.max;
							}
							if (val.resistance !== undefined) {
								hasResistance = true;
								res[p] = val.resistance;
							}
						} else if (typeof(val) === "number") {
							velocities[p] = val;
						} else {
							tracker = tracker || VelocityTracker.getByTarget(t);
							if (tracker && tracker.isTrackingProp(p)) {
								velocities[p] = tracker.getVelocity(p); //rotational values are actually converted to radians in CSSPlugin, but our tracking velocity is in radians already, so make it into degrees to avoid a funky conversion
							} else {
								velocities[p] = val || 0;
							}
						}
						if (_transforms[p]) {
							cssp._enableTransforms((_transforms[p] === 2));
						}
					}
				}
				data = _parseToProxy(t, velocities, cssp, pt, plugin);
				_cssProxy = data.proxy;
				velocities = data.end;
				for (p in _cssProxy) {
					_cssVars[p] = {velocity:velocities[p], min:min[p], max:max[p], end:end[p], resistance:res[p]};
				}
				if (e.resistance != null) {
					_cssVars.resistance = e.resistance;
				}
				pt = new CSSPropTween(t, "throwProps", 0, 0, data.pt, 2);
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				pt.data = data;
				plugin._onInitTween(_cssProxy, _cssVars, cssp._tween);
				return pt;
			}});
		};

		
		ThrowPropsPlugin.to = function(target, vars, maxDuration, minDuration, overshootTolerance) {
			if (!vars.throwProps) {
				vars = {throwProps:vars};
			}
			var tween = new TweenLite(target, 1, vars);
			tween.render(0, true, true); //we force a render so that the CSSPlugin instantiates and populates the _cssProxy and _cssVars which we need in order to calculate the tween duration. Remember, we can't use the regular target for calculating the duration because the current values wouldn't be able to be grabbed like target["propertyName"], as css properties can be complex like boxShadow:"10px 10px 20px 30px red" or backgroundPosition:"25px 50px". The proxy is the result of breaking all that complex data down and finding just the numeric values and assigning them to a generic proxy object with unique names. THAT is what the _calculateTweenDuration() can look at. We also needed to to the same break down of any min or max or velocity data
			if (tween.vars.css) {
				tween.duration(_calculateTweenDuration(_cssProxy, {throwProps:_cssVars, ease:vars.ease}, maxDuration, minDuration, overshootTolerance));
				if (tween._delay && !tween.vars.immediateRender) {
					tween.invalidate(); //if there's a delay, the starting values could be off, so invalidate() to force reinstantiation when the tween actually starts.
				} else {
					_last._onInitTween(_cssProxy, _lastValue, tween);
				}
				return tween;
			} else {
				tween.kill();
				return new TweenLite(target, _calculateTweenDuration(target, vars, maxDuration, minDuration, overshootTolerance), vars);
			}
		};
		
		p._onInitTween = function(target, value, tween) {
			this.target = target;
			this._props = [];
			_last = this;
			_lastValue = value;
			var ease = tween._ease,
				checkpoint = isNaN(value.checkpoint) ? 0.05 : Number(value.checkpoint),
				duration = tween._duration, 
				cnt = 0,
				p, curProp, curVal, isFunc, velocity, change1, end, change2, tracker;
			for (p in value) {
				if (p !== "resistance" && p !== "checkpoint") {
					curProp = value[p];
					if (typeof(curProp) === "number") {
						velocity = Number(curProp) || 0;
					} else if (typeof(curProp) === "object" && !isNaN(curProp.velocity)) {
						velocity = Number(curProp.velocity);
					} else {
						tracker = tracker || VelocityTracker.getByTarget(target);
						if (tracker && tracker.isTrackingProp(p)) {
							velocity = tracker.getVelocity(p);
						} else {
							throw("ERROR: No velocity was defined in the throwProps tween of " + target + " property: " + p);
						}
					}
					change1 = _calculateChange(velocity, ease, duration, checkpoint);
					change2 = 0;
					isFunc = (typeof(target[p]) === "function");
					curVal = (isFunc) ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() : target[p];
					if (typeof(curProp) === "object") {
						end = curVal + change1;
						if (curProp.end !== undefined) {
							curProp = _parseEnd(curProp, end, curProp.max, curProp.min);
						}
						if (curProp.max !== undefined && Number(curProp.max) < end) {
							change2 = (curProp.max - curVal) - change1;
							
						} else if (curProp.min !== undefined && Number(curProp.min) > end) {
							change2 = (curProp.min - curVal) - change1;
						}
					}
					this._props[cnt++] = {p:p, s:curVal, c1:change1, c2:change2, f:isFunc, r:false};
					this._overwriteProps[cnt] = p;
				}
			}
			return true;
		};
		
		p._kill = function(lookup) {
			var i = this._props.length;
			while (--i > -1) {
				if (lookup[this._props[i].p] != null) {
					this._props.splice(i, 1);
				}
			}
			return TweenPlugin.prototype._kill.call(this, lookup);
		};
		
		p._roundProps = function(lookup, value) {
			var p = this._props,
				i = p.length;
			while (--i > -1) {
				if (lookup[p[i]] || lookup.throwProps) {
					p[i].r = value;
				}
			}
		};
		
		p.setRatio = function(v) {
			var i = this._props.length, 
				cp, val;
			while (--i > -1) {
				cp = this._props[i];
				val = cp.s + cp.c1 * v + cp.c2 * v * v;
				if (cp.r) {
					val = (val + ((val > 0) ? 0.5 : -0.5)) | 0;
				}
				if (cp.f) {
					this.target[cp.p](val);
				} else {
					this.target[cp.p] = val;
				}
			}	
		};
		
		TweenPlugin.activate([ThrowPropsPlugin]);
		
		return ThrowPropsPlugin;
		
	}, true);



/*
 * ----------------------------------------------------------------
 * VelocityTracker
 * ----------------------------------------------------------------
 */
	window._gsDefine("utils.VelocityTracker", ["TweenLite"], function(TweenLite) {

		var _first,	_initted, _time1, _time2,
			_capsExp = /([A-Z])/g,
			_empty = {},
			_transforms = {x:1,y:1,z:2,scale:1,scaleX:1,scaleY:1,rotation:1,rotationZ:1,rotationX:2,rotationY:2,skewX:1,skewY:1},
			_getComputedStyle = document.defaultView ? document.defaultView.getComputedStyle : function() {},
			_getStyle = function(t, p, cs) {
				var rv = (t._gsTransform || _empty)[p];
				if (rv || rv === 0) {
					return rv;
				} else if (t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t, null))) {
					t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
					rv = (t || cs.length) ? t : cs[p]; //Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
				} else if (t.currentStyle) {
					cs = t.currentStyle;
					rv = cs[p];
				}
				return parseFloat(rv) || 0;
			},
			_ticker = TweenLite.ticker,
			VelocityProp = function(p, isFunc, next) {
				this.p = p;
				this.f = isFunc;
				this.v1 = this.v2 = 0;
				this.t1 = this.t2 = _ticker.time;
				this.css = false;
				this.type = "";
				this._prev = null;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},
			_update = function() {
				var vt = _first,
					t = _ticker.time,
					val, vp;
				//if the frame rate is too high, we won't be able to track the velocity as well, so only update the values about 33 times per second
				if (t - _time1 >= 0.03) {
					_time2 = _time1;
					_time1 = t;
					while (vt) {
						vp = vt._firstVP;
						while (vp) {
							val = vp.css ? _getStyle(vt.target, vp.p) : vp.f ? vt.target[vp.p]() : vt.target[vp.p];
							if (val !== vp.v1 || t - vp.t1 > 0.15) { //use a threshold of 0.15 seconds for zeroing-out velocity. If we only use 0.03 and things update slightly slower, like some Android devices dispatch "touchmove" events sluggishly so 2 or 3 ticks of the TweenLite.ticker may elapse inbetween, thus it may appear like the object is not moving but it actually is but it's not updating as frequently. A threshold of 0.15 seconds seems to be a good balance. We want to update things frequently (0.03 seconds) when they're moving so that we can respond to fast motions accurately, but we want to be more resistant to go back to a zero velocity.
								vp.v2 = vp.v1;
								vp.v1 = val;
								vp.t2 = vp.t1;
								vp.t1 = t;
							}
							vp = vp._next;
						}
						vt = vt._next;
					}
				}
			},
			VelocityTracker = function(target) {
				this._lookup = {};
				this.target = target;
				this.elem = (target.style && target.nodeType) ? true : false;
				if (!_initted) {
					_ticker.addEventListener("tick", _update, null, false, -100);
					_time1 = _time2 = _ticker.time;
					_initted = true;
				}
				if (_first) {
					this._next = _first;
					_first._prev = this;
				}
				_first = this;
			},
			getByTarget = VelocityTracker.getByTarget = function(target) {
				var vt = _first;
				while (vt) {
					if (vt.target === target) {
						return vt;
					}
					vt = vt._next;
				}
			},
			p = VelocityTracker.prototype;

		p.addProp = function(prop, type) {
			if (!this._lookup[prop]) {
				var t = this.target,
					isFunc = (typeof(t[prop]) === "function"),
					alt = isFunc ? this._altProp(prop) : prop,
					vp = this._firstVP;
				this._firstVP = this._lookup[prop] = this._lookup[alt] = vp = new VelocityProp((alt !== prop && prop.indexOf("set") === 0) ? alt : prop, isFunc, vp);
				vp.css = (this.elem && (this.target.style[vp.p] !== undefined || _transforms[vp.p]));
				if (vp.css && _transforms[vp.p] && !t._gsTransform) {
					TweenLite.set(t, {x:"+=0"}); //just forces CSSPlugin to create a _gsTransform for the element if it doesn't exist
				}
				vp.type = type || (vp.css && prop.indexOf("rotation") === 0) ? "deg" : "";
				vp.v1 = vp.v2 = vp.css ? _getStyle(t, vp.p) : isFunc ? t[vp.p]() : t[vp.p];
			}
		};

		p.removeProp = function(prop) {
			var vp = this._lookup[prop];
			if (vp) {
				if (vp._prev) {
					vp._prev._next = vp._next;
				} else if (vp === this._firstVP) {
					this._firstVP = vp._next;
				}
				if (vp._next) {
					vp._next._prev = vp._prev;
				}
				this._lookup[prop] = 0;
				if (vp.f) {
					this._lookup[this._altProp(prop)] = 0; //if it's a getter/setter, we should remove the matching counterpart (if one exists)
				}
			}
		};

		p.isTrackingProp = function(prop) {
			return (this._lookup[prop] instanceof VelocityProp);
		};

		p.getVelocity = function(prop) {
			var vp = this._lookup[prop],
				target = this.target,
				val, dif, rotationCap;
			if (!vp) {
				throw "The velocity of " + prop + " is not being tracked.";
			}
			val = vp.css ? _getStyle(target, vp.p) : vp.f ? target[vp.p]() : target[vp.p];
			dif = (val - vp.v2);
			if (vp.type === "rad" || vp.type === "deg") { //rotational values need special interpretation so that if, for example, they go from 179 to -178 degrees it is interpreted as a change of 3 instead of -357.
				rotationCap = (vp.type === "rad") ? Math.PI * 2 : 360;
				dif = dif % rotationCap;
				if (dif !== dif % (rotationCap / 2)) {
					dif = (dif < 0) ? dif + rotationCap : dif - rotationCap;
				}
			}
			return dif / (_ticker.time - vp.t2);
		};

		p._altProp = function(p) { //for getters/setters like getCustomProp() and setCustomProp() - we should accommodate both
			var pre = p.substr(0, 3),
				alt = ((pre === "get") ? "set" : (pre === "set") ? "get" : pre) + p.substr(3);
			return (typeof(this.target[alt]) === "function") ? alt : p;
		};

		VelocityTracker.getByTarget = function(target) {
			var vt = _first;
			while (vt) {
				if (vt.target === target) {
					return vt;
				}
				vt = vt._next;
			}
		};

		VelocityTracker.track = function(target, props, types) {
			var vt = getByTarget(target),
				a = props.split(","),
				i = a.length;
			types = (types || "").split(",");
			if (!vt) {
				vt = new VelocityTracker(target);
			}
			while (--i > -1) {
				vt.addProp(a[i], types[i] || types[0]);
			}
			return vt;
		};

		VelocityTracker.untrack = function(target, props) {
			var vt = getByTarget(target),
				a = (props || "").split(","),
				i = a.length;
			if (!vt) {
				return;
			}
			while (--i > -1) {
				vt.removeProp(a[i]);
			}
			if (!vt._firstVP || !props) {
				if (vt._prev) {
					vt._prev._next = vt._next;
				} else if (vt === _first) {
					_first = vt._next;
				}
				if (vt._next) {
					vt._next._prev = vt._prev;
				}
			}
		};

		VelocityTracker.isTracking = function(target, prop) {
			var vt = getByTarget(target);
			return (!vt) ? false : (!prop && vt._firstVP) ? true : vt.isTrackingProp(prop);
		};

		return VelocityTracker;

	}, true);


}); if (window._gsDefine) { window._gsQueue.pop()(); }