function windowResize() {
	document.getElementsByTagName("html")[0].style.zoom = window.innerWidth / 1920;
}
function MalkarionWeapon() {
	document.getElementById("LockCheckbox 1_10").checked
		? ((document.getElementById("LockCheckbox 1_3").checked = !0),
		  (document.getElementById("LockCheckbox 1_11").checked = !0),
		  (document.getElementById("LockCheckbox 1_20").checked = !0),
		  (document.getElementById("LegendaryWeapon").checked = !0))
		: ((document.getElementById("LockCheckbox 1_3").checked = !1),
		  (document.getElementById("LockCheckbox 1_11").checked = !1),
		  (document.getElementById("LockCheckbox 1_20").checked = !1),
		  (document.getElementById("LegendaryWeapon").checked = !1)),
		EmployWorkers();
}
function TorgadoroWeapon() {
	document.getElementById("LockCheckbox 1_22").checked
		? ((document.getElementById("LockCheckbox 1_2").checked = !0),
		  (document.getElementById("LockCheckbox 1_4").checked = !0),
		  (document.getElementById("LockCheckbox 1_7").checked = !0),
		  (document.getElementById("LegendaryWeapon").checked = !0))
		: ((document.getElementById("LockCheckbox 1_2").checked = !1),
		  (document.getElementById("LockCheckbox 1_4").checked = !1),
		  (document.getElementById("LockCheckbox 1_7").checked = !1),
		  (document.getElementById("LegendaryWeapon").checked = !1)),
		EmployWorkers();
}
function ThraxWeapon() {
	document.getElementById("LockCheckbox 1_21").checked
		? ((document.getElementById("LockCheckbox 1_15").checked = !0),
		  (document.getElementById("LockCheckbox 1_17").checked = !0),
		  (document.getElementById("LegendaryWeapon").checked = !0))
		: ((document.getElementById("LockCheckbox 1_15").checked = !1),
		  (document.getElementById("LockCheckbox 1_17").checked = !1),
		  (document.getElementById("LegendaryWeapon").checked = !1)),
		EmployWorkers();
}
function ArgarusWeapon() {
	document.getElementById("LockCheckbox 1_0").checked
		? ((document.getElementById("LockCheckbox 1_8").checked = !0),
		  (document.getElementById("LockCheckbox 1_9").checked = !0),
		  (document.getElementById("LockCheckbox 1_18").checked = !0),
		  (document.getElementById("LegendaryWeapon").checked = !0))
		: ((document.getElementById("LockCheckbox 1_8").checked = !1),
		  (document.getElementById("LockCheckbox 1_9").checked = !1),
		  (document.getElementById("LockCheckbox 1_18").checked = !1),
		  (document.getElementById("LegendaryWeapon").checked = !1)),
		EmployWorkers();
}
function encode(e, t = encodingChars.length) {
	let n = "4";
	for (let r = 0; r < e.length; r++) {
		0 != r && (n += "_");
		let c = e[r];
		if (0 == c.length) continue;
		let d = Math.max.apply(null, c) + 1,
			l = [],
			o = [];
		for (let e = 1; e < 10; e++) l.push(e * (Math.log10(d) / Math.log10(t))), o.push(l[e - 1] % 1);
		let i = Math.max.apply(null, o),
			s = o.indexOf(i) + 1,
			a = Math.ceil(l[s - 1]),
			m = d;
		(n += encodingChars.substr(m % t, 1)), (m = Math.floor(m / t)), (n += encodingChars.substr(m % t, 1));
		for (let e = c.length; e % s != 0; e++) c.push(0);
		for (let e = 0; e < c.length; e += s) {
			let r = 0;
			for (let t = 0; t < s; t++) r = r * d + c[e + t];
			for (let e = 0; e < a; e++) (n += encodingChars.substr(r % t, 1)), (r = Math.floor(r / t));
		}
	}
	return n;
}
function decode(e, t = encodingChars.length) {
	if (((urlVersion = encodingChars.indexOf(e[0])), "0" == e[0] || "1" == e[0] || "2" == e[0] || "3" == e[0] || "4" == e[0])) {
		let n = [];
		e = (e = e.substr(1)).split("_");
		for (let r = 0; r < e.length; r++) {
			n.push([]);
			let c = e[r].split("").map((e) => encodingChars.indexOf(e)),
				d = 0;
			(d = (d = d * t + c[1]) * t + c[0]), c.shift(), c.shift();
			let l = [],
				o = [];
			for (let e = 1; e < 10; e++) l.push(e * (Math.log10(d) / Math.log10(t))), o.push(l[e - 1] % 1);
			let i = Math.max.apply(null, o),
				s = o.indexOf(i) + 1,
				a = Math.ceil(l[s - 1]);
			for (let e = 0; e < c.length; e += a) {
				let l = 0,
					o = [];
				for (let n = a - 1; 0 <= n; n--) l = l * t + c[e + n];
				for (let e = 0; e < s; e++) o.push(l % d), (l = Math.floor(l / d));
				o = o.reverse();
				for (let e = 0; e < s && 0 != o[e]; e++) n[r].push(o[e]);
			}
		}
		return n;
	}
	return -1;
}
function EmployWorkers() {
	window.scrollY > 1080 && window.scrollTo(0, 0);
	var e = [],
		t = [];
	(urlPerks = []), (urlLocks = []);
	var n = document.getElementsByClassName("PerkCard");
	for (i = 0; i < n.length; i++)
		e.push({j: parseInt(n[i].id.split("_")[0]), k: parseInt(n[i].id.split("_")[1])}),
			t.push(parseInt(n[i].children[1].firstChild.textContent.split(" ")[0].substring(1)) / 3),
			urlPerks.push(perkButtonIdList.indexOf(n[i].id));
	for (0 == urlPerks.length && urlPerks.push(0), 0 == urlPerks.length && urlPerks.push(0); workerList.length > 0; )
		workerList[0].terminate(), workerList.shift();
	var r = new Worker("./js/webWorker.min.js");
	workerList.push(r),
		workerList[0].postMessage({
			indexPerk: e,
			indexPerkRank: t,
			lock: getLockIndices(),
			legendaryWeapon: document.getElementById("LegendaryWeapon").checked,
		}),
		history.pushState(null, null, "/?" + encode([urlPerks, t, urlLocks])),
		(workerList[0].onmessage = function (e) {
			if (void 0 != e.data.bonusPerks) {
				applyBonusPerksUI(e.data.bonusPerks);
			}
			if (void 0 != e.data.set) {
				printTableUI(e.data.set);
			}
		});
}
function applyBonusPerksUI(e) {
	for (i = 0; i < e.length; i++)
		"btn disabled" != document.getElementById(e[i].stringID).className &&
			(e[i].value > 1
				? (document.getElementById(e[i].stringID).className = "PerkButton  waves-effect waves-light btn tooltipped plus6")
				: e[i].value > 0
				? (document.getElementById(e[i].stringID).className = "PerkButton  waves-effect waves-light btn tooltipped plus3")
				: (document.getElementById(e[i].stringID).className = "PerkButton  waves-effect waves-light btn tooltipped plus0"));
	document.getElementById("Builds Table Body").textContent = "";
}
function clearTableUI() {
	let e = document.getElementsByTagName("td").length;
	for (let t = 0; t < e; t++) document.getElementsByTagName("td")[t].textContent = "";
}
function printArmorUI(e, t, n) {
	let r = document.createElement("td"),
		c = document.createElement("div");
	c.className = "PrintEquipment";
	let d = document.createElement("img");
	(d.src = e.icon), (d.className = "ArmorIcon"), c.appendChild(d);
	let l = document.createElement("div");
	(l.textContent = e.id), c.appendChild(l), r.appendChild(c), n.appendChild(r);
}
function printWeaponUI(e, t, n) {
	let r = document.createElement("td"),
		c = document.createElement("div");
	c.className = "PrintEquipment";
	let d = document.createElement("img");
	(d.src = e.icon), (d.className = "ArmorIcon"), c.appendChild(d);
	let l = document.createElement("div");
	document.getElementById("LegendaryWeapon").checked ? (l.textContent = "Legendary " + e.id + " " + e.type) : (l.textContent = e.id + " " + e.type),
		c.appendChild(l),
		r.appendChild(c),
		n.appendChild(r);
}
function pushToDBArrayOnWeaponType(e, t, n, r, c, d, l, o, i, s) {
	"Aether Strikers" == t
		? e.push(n)
		: "Axe" == t
		? e.push(r)
		: "Chain Blades" == t
		? e.push(c)
		: "Hammer" == t
		? e.push(d)
		: "Sword" == t
		? e.push(l)
		: "War Pike" == t
		? e.push(o)
		: "Repeaters" == t
		? e.push(i)
		: e.push(s);
}
function generateDBurl(e, t) {
	let n = document.getElementById("LegendaryWeapon").checked,
		r = weapon[e.id[4]][e.id[5]].type,
		c = weapon[e.id[4]][e.id[5]].element,
		d = weapon[e.id[4]][e.id[5]].DBmap,
		l = [3];
	n
		? "Shock" == c
			? pushToDBArrayOnWeaponType(l, r, 132, 130, 128, 129, 127, 131, d, d)
			: "Umbral" == c
			? pushToDBArrayOnWeaponType(l, r, 139, 140, 141, 142, 144, 143, d, d)
			: "Terra" == c
			? pushToDBArrayOnWeaponType(l, r, 145, 147, 146, 150, 149, 148, d, d)
			: pushToDBArrayOnWeaponType(l, r, 137, 133, 136, 134, 138, 135, d, d)
		: l.push(d),
		l.push(15),
		perkList[e.cell[4].j][e.cell[4].k].type.name == weapon[e.id[4]][e.id[5]].cell[0]
			? l.push(perkList[e.cell[4].j][e.cell[4].k].DBmap, perkList[e.cell[5].j][e.cell[5].k].DBmap)
			: l.push(perkList[e.cell[5].j][e.cell[5].k].DBmap, perkList[e.cell[4].j][e.cell[4].k].DBmap),
		"Aether Strikers" == r
			? l.push(3, 2)
			: "Axe" == r
			? l.push(5, 3)
			: "Sword" == r
			? l.push(7, 6)
			: "Chain Blades" == r
			? l.push(5, 3)
			: "War Pike" == r
			? l.push(5, 8)
			: "Hammer" == r
			? l.push(5, 1)
			: "Repeater" == r
			? l.push(0, 8, 9, 19, 0, 25)
			: l.push(0, 0),
		"Repeater" != r && (n ? l.push(0, 0, weapon[e.id[4]][e.id[5]].DBmap, 0) : l.push(0, 0, 0, 0)),
		l.push(
			head[e.id[0]].DBmap,
			15,
			perkList[e.cell[0].j][e.cell[0].k].DBmap,
			torso[e.id[1]].DBmap,
			15,
			perkList[e.cell[1].j][e.cell[1].k].DBmap,
			arms[e.id[2]].DBmap,
			15,
			perkList[e.cell[2].j][e.cell[2].k].DBmap,
			legs[e.id[3]].DBmap,
			15,
			perkList[e.cell[3].j][e.cell[3].k].DBmap,
			2,
			perkList[e.cell[6].j][e.cell[6].k].DBmap
		);
	let o = document.createElement("td"),
		i = document.createElement("a");
	(i.href = "https://www.dauntless-builder.com/b/" + hashids.encode(l)), (i.target = "_blank");
	let s = document.createElement("img");
	(s.src = "assets/export.png"), (s.className = "ArmorIcon"), i.appendChild(s), o.appendChild(i), t.appendChild(o);
}
function printTableUI(e) {
	let t = document.createElement("tr");
	printArmorUI(head[e.id[0]], e.cell[0], t),
		printArmorUI(torso[e.id[1]], e.cell[1], t),
		printArmorUI(arms[e.id[2]], e.cell[2], t),
		printArmorUI(legs[e.id[3]], e.cell[3], t),
		printWeaponUI(weapon[e.id[4]][e.id[5]], [e.cell[4], e.cell[5]], t),
		generateDBurl(e, t),
		BuildsFoundTable.appendChild(t),
		workerList[0].postMessage(-23);
}
function PerkClicked(e) {
	let t;
	(t = e.target.classList.contains("plus6") ? 6 : 3), (e.target.className = "btn disabled");
	let n = document.createElement("div");
	(n.className = "animated bounceInLeft faster"), document.getElementById("SelectedPerks").appendChild(n);
	let r = document.createElement("div");
	(r.className = "displayHorizontal"), (r.id = e.target.id), n.appendChild(r);
	let c = document.createElement("div");
	(c.className = "rankChange"), r.appendChild(c);
	let d = document.createElement("img");
	(d.className = "rankIcon waves-effect"), (d.src = "assets/upArrow.png"), d.addEventListener("click", PlusButtonCLicked), c.appendChild(d);
	let l = document.createElement("img");
	(l.className = "rankIcon"), (l.src = "assets/downArrow.png"), l.addEventListener("click", MinusButtonCLicked), c.appendChild(l);
	let o = document.createElement("div");
	(o.className = "PerkCard tooltipped"), o.setAttribute("data-position", "left");
	let i = "";
	for (let t = 0; t < perkList[parseInt(e.target.id.split("_")[0])][parseInt(e.target.id.split("_")[1])].effect.length; t++)
		i =
			i +
			String(t + 1) +
			": " +
			perkList[parseInt(e.target.id.split("_")[0])][parseInt(e.target.id.split("_")[1])].effect[t].description +
			"\n";
	o.setAttribute("data-tooltip", i),
		(o.id = e.target.id),
		r.appendChild(o),
		hasTouch() || M.Tooltip.init(o, {outDuration: 0, inDuration: 400, enterDelay: 500, margin: 0, transitionMovement: 3});
	let s = document.createElement("div"),
		a = document.createElement("img");
	(s.className = "PerkCardIcon"),
		(a.src = "assets/icons/perks/" + cellType[e.target.id.split("_")[0]] + ".png"),
		s.appendChild(a),
		o.appendChild(s);
	let m = document.createElement("div");
	(m.className = "PerkCardText"), o.appendChild(m);
	let u = document.createElement("div");
	(u.className = "PerkCardTitle"),
		u.appendChild(document.createTextNode("+" + t + " " + e.target.textContent)),
		m.appendChild(u),
		(divPerkCardContent = document.createElement("div")),
		divPerkCardContent.appendChild(
			document.createTextNode(perkList[parseInt(e.target.id.split("_")[0])][parseInt(e.target.id.split("_")[1])].effect[t - 1].description)
		),
		m.appendChild(divPerkCardContent),
		EmployWorkers();
}
function PlusButtonCLicked() {
	let e = event.target.parentElement.parentElement.children[1].children[1].firstChild.textContent,
		t = parseInt(e.split(" ")[0].substring(1)),
		n = e.substring(e.indexOf(" "));
	(event.target.parentElement.parentElement.children[1].children[1].firstChild.textContent = "+" + String(t + 3) + " " + n),
		(event.target.parentElement.parentElement.children[1].children[1].children[1].textContent =
			perkList[parseInt(event.target.parentElement.parentElement.id.split("_")[0])][
				parseInt(event.target.parentElement.parentElement.id.split("_")[1])
			].effect[t + 3 - 1].description),
		EmployWorkers();
}
function MinusButtonCLicked() {
	let e = event.target.parentElement.parentElement.children[1].children[1].firstChild.textContent,
		t = parseInt(e.split(" ")[0].substring(1)),
		n = e.substring(e.indexOf(" "));
	t > 3
		? ((event.target.parentElement.parentElement.children[1].children[1].firstChild.textContent = "+" + String(t - 3) + " " + n),
		  (event.target.parentElement.parentElement.children[1].children[1].children[1].textContent =
				perkList[parseInt(event.target.parentElement.parentElement.id.split("_")[0])][
					parseInt(event.target.parentElement.parentElement.id.split("_")[1])
				].effect[t - 3 - 1].description))
		: ((document.getElementById(event.target.parentElement.parentElement.id).className =
				"waves-effect waves-light btn grey lighten-4 black-text"),
		  event.target.parentElement.parentElement.parentElement.remove(event.target.parentElement.parentElement)),
		EmployWorkers();
}
function CheckAllClicked() {
	toggleAllChecboxes(-1 == getLockIndices() ? !0 : !1);
}
function toggleAllChecboxes(e) {
	for (i = 0; i < weapon.length; i++) document.getElementById("LockCheckbox 0 " + String(i)).checked = e;
	for (j = 1; j < armorTypeLength + 2; j++)
		if (j < 3) for (i = 0; i < idList.length; i++) document.getElementById("LockCheckbox " + String(j) + " " + String(i)).checked = e;
		else for (i = 0; i < idList.length - 3; i++) document.getElementById("LockCheckbox " + String(j) + " " + String(i)).checked = e;
}
function generateRandomBuild() {
	function e(e, t = 0) {
		return Math.floor(Math.random() * (e - t)) + t;
	}
	function t(t) {
		return perkList[cellType.indexOf(t)][e(perkList[cellType.indexOf(t)].length)];
	}
	function n(e) {
		r.push(e.DBmap, 15), r.push(t(e.cell).DBmap);
	}
	let r = [3],
		c = weapon.flat(1),
		d = c[e(c.length)];
	r.push(d.DBmap, 15), r.push(t(d.cell[0]).DBmap), r.push(t(d.cell[1]).DBmap), console.log(r), r.push(0, 0, 0, 0, 0, 0);
	n(head[e(head.length)]);
	n(torso[e(torso.length)]);
	n(arms[e(arms.length)]);
	n(legs[e(legs.length)]),
		r.push(e(8, 1)),
		r.push(t("Utility").DBmap),
		(window.location = "https://www.dauntless-builder.com/b/" + hashids.encode(r));
}
function getLockIndices() {
	let e = [];
	for (e.push([]), i = 0; i < weapon.length; i++)
		document.getElementById("LockCheckbox 0_" + String(i)).checked &&
			(e[0].push(i), urlLocks.push(LockCheckboxIdList.indexOf("LockCheckbox 0_" + String(i))));
	for (j = 1; j < armorTypeLength + 2; j++)
		if ((e.push([]), j < 3))
			for (i = 0; i < idList.length; i++)
				document.getElementById("LockCheckbox " + String(j) + "_" + String(i)).checked &&
					(e[j].push(i), urlLocks.push(LockCheckboxIdList.indexOf("LockCheckbox " + String(j) + "_" + String(i))));
		else
			for (i = 0; i < idList.length - 3; i++)
				document.getElementById("LockCheckbox " + String(j) + "_" + String(i)).checked &&
					(e[j].push(i), urlLocks.push(LockCheckboxIdList.indexOf("LockCheckbox " + String(j) + "_" + String(i))));
	for (i = 0; i < e.length; i++) if (e[i].length > 0) return e;
	return -1;
}
windowResize(),
	window.addEventListener("DOMContentLoaded", () => {
		let e = document.getElementsByClassName("sliding-tabs");
		for (let n = 0; n < e.length; n++) {
			let r = e[n].getElementsByClassName("navWrapper")[0],
				c = r.getElementsByTagName("a"),
				d = r.getElementsByClassName("selector")[0],
				l = r.getElementsByClassName("active")[0];
			(d.style.left = l.offsetLeft + "px"), (d.style.width = l.clientWidth + "px");
			for (let r = 0; r < c.length; r++)
				c[r].addEventListener("click", function (r) {
					r.preventDefault(),
						(function (t) {
							e[n].getElementsByClassName("slider")[0].scroll(t.offsetLeft, 0);
						})(document.getElementById(r.target.href.split("#")[1])),
						t(r.target);
				});
			function t(e) {
				l.classList.remove("active"),
					(l = e).classList.add("active"),
					(d.style.left = l.offsetLeft + "px"),
					(d.style.width = l.clientWidth + "px");
			}
			let o = new IntersectionObserver(
					function (e, n) {
						e.forEach((e) => {
							if (e.isIntersecting) for (let n = 0; n < c.length; n++) c[n].href.split("#")[1] == e.target.id && t(c[n]);
						});
					},
					{root: e[n].getElementsByClassName("slider")[0], threshold: 0.8}
				),
				s = document.getElementsByClassName("slide");
			for (i = 0; i < s.length; i++) o.observe(s[i]);
		}
	});
var perkButtonIdList = [];
perkButtonIdList.push("");
var perkButtonElems = document.querySelectorAll(".PerkButton");
for (let e = 0; e < perkButtonElems.length; e++)
	perkButtonElems[e].addEventListener("click", PerkClicked), perkButtonIdList.push(perkButtonElems[e].id);
console.log(perkButtonIdList.indexOf("4_0"));
var LockCheckboxIdList = [];
LockCheckboxIdList.push("");
var LockCheckboxElems = document.querySelectorAll(".LockCheckbox");
for (let e = 0; e < LockCheckboxElems.length; e++)
	LockCheckboxElems[e].addEventListener("click", function (e) {
		"LockCheckbox 1_10" == e.target.id && MalkarionWeapon(),
			"LockCheckbox 1_22" == e.target.id && TorgadoroWeapon(),
			"LockCheckbox 1_21" == e.target.id && ThraxWeapon(),
			"LockCheckbox 1_0" == e.target.id && ArgarusWeapon();
	}),
		LockCheckboxElems[e].addEventListener("click", EmployWorkers),
		LockCheckboxIdList.push(LockCheckboxElems[e].id);
var urlVersion,
	urlRanks = [],
	urlPerks = [],
	urlLocks = [];
const encodingChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-~";
var workerList = [],
	armorTypeLength = 4,
	BuildsFoundTable = document.getElementById("Builds Table Body"),
	hashids = new Hashids.default("spicy", 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"),
	queryString = window.location.search.substr(1);
if ("0" == queryString[0]) {
	queryString.substr(1), (queryString = decode(queryString));
	for (let e = 0; e < queryString[0].length; e++)
		queryString[0][e] >= 48 && (queryString[0][e] += 1),
			queryString[0][e] >= 32 && (queryString[0][e] += 1),
			queryString[0][e] >= 9 && (queryString[0][e] += 1),
			queryString[0][e] >= 19 && (queryString[0][e] += 1),
			document.getElementById(perkButtonIdList[queryString[0][e]]).click();
	PerkCardList = document.getElementsByClassName("PerkCard");
	for (let e = 0; e < queryString[1].length; e++)
		PerkCardList[e].children[1].firstChild.textContent =
			"+" +
			String(3 * queryString[1][e]) +
			" " +
			PerkCardList[e].children[1].firstChild.textContent.substring(PerkCardList[e].children[1].firstChild.textContent.indexOf(" ") + 1);
	EmployWorkers();
}
if ("1" == queryString[0]) {
	let e = !1;
	queryString.substr(1), (queryString = decode(queryString));
	for (let e = 0; e < queryString[0].length; e++)
		queryString[0][e] >= 48 && (queryString[0][e] += 1),
			queryString[0][e] >= 32 && (queryString[0][e] += 1),
			queryString[0][e] >= 9 && (queryString[0][e] += 1),
			document.getElementById(perkButtonIdList[queryString[0][e]]).click();
	PerkCardList = document.getElementsByClassName("PerkCard");
	for (let e = 0; e < queryString[1].length; e++)
		PerkCardList[e].children[1].firstChild.textContent =
			"+" +
			String(3 * queryString[1][e]) +
			" " +
			PerkCardList[e].children[1].firstChild.textContent.substring(PerkCardList[e].children[1].firstChild.textContent.indexOf(" ") + 1);
	for (let t = 0; t < queryString[2].length; t++) 17 == queryString[2][t] && (e = !0);
	1 == e &&
		((document.getElementById("LockCheckbox 1_10").checked = !0),
		(document.getElementById("LockCheckbox 1_3").checked = !0),
		(document.getElementById("LockCheckbox 1_11").checked = !0),
		(document.getElementById("LockCheckbox 1_20").checked = !0),
		(document.getElementById("LegendaryWeapon").checked = !0)),
		EmployWorkers();
}
if ("2" == queryString[0]) {
	let e = !1,
		t = !1;
	queryString.substr(1), (queryString = decode(queryString));
	for (let e = 0; e < queryString[0].length; e++)
		queryString[0][e] >= 48 && (queryString[0][e] += 1),
			queryString[0][e] >= 32 && (queryString[0][e] += 1),
			queryString[0][e] >= 9 && (queryString[0][e] += 1),
			document.getElementById(perkButtonIdList[queryString[0][e]]).click();
	PerkCardList = document.getElementsByClassName("PerkCard");
	for (let e = 0; e < queryString[1].length; e++)
		PerkCardList[e].children[1].firstChild.textContent =
			"+" +
			String(3 * queryString[1][e]) +
			" " +
			PerkCardList[e].children[1].firstChild.textContent.substring(PerkCardList[e].children[1].firstChild.textContent.indexOf(" ") + 1);
	for (let n = 0; n < queryString[2].length; n++) 17 == queryString[2][n] && (e = !0), 29 == queryString[2][n] && (t = !0);
	EmployWorkers(),
		1 == e &&
			((document.getElementById("LockCheckbox 1_10").checked = !0),
			(document.getElementById("LockCheckbox 1_3").checked = !0),
			(document.getElementById("LockCheckbox 1_11").checked = !0),
			(document.getElementById("LockCheckbox 1_20").checked = !0),
			(document.getElementById("LegendaryWeapon").checked = !0)),
		1 == t &&
			((document.getElementById("LockCheckbox 1_22").checked = !0),
			(document.getElementById("LockCheckbox 1_2").checked = !0),
			(document.getElementById("LockCheckbox 1_4").checked = !0),
			(document.getElementById("LockCheckbox 1_7").checked = !0),
			(document.getElementById("LegendaryWeapon").checked = !0));
}
if ("3" == queryString[0]) {
	let e = !1;
	queryString.substr(1), (queryString = decode(queryString));
	for (let e = 0; e < queryString[0].length; e++)
		queryString[0][e] >= 32 && (queryString[0][e] += 1),
			queryString[0][e] >= 9 && (queryString[0][e] += 1),
			document.getElementById(perkButtonIdList[queryString[0][e]]).click();
	PerkCardList = document.getElementsByClassName("PerkCard");
	for (let e = 0; e < queryString[1].length; e++)
		PerkCardList[e].children[1].firstChild.textContent =
			"+" +
			String(3 * queryString[1][e]) +
			" " +
			PerkCardList[e].children[1].firstChild.textContent.substring(PerkCardList[e].children[1].firstChild.textContent.indexOf(" ") + 1);
	for (let t = 0; t < queryString[2].length; t++) {
		let n = parseInt(document.getElementById(LockCheckboxIdList[queryString[2][t]]).id.split(" ")[1].split("_")[0]);
		document.getElementById(LockCheckboxIdList[queryString[2][t] + n]).click(), 17 == queryString[2][t] && (e = !0);
	}
	1 == e &&
		((document.getElementById("LockCheckbox 1_10").checked = !0),
		(document.getElementById("LockCheckbox 1_3").checked = !0),
		(document.getElementById("LockCheckbox 1_11").checked = !0),
		(document.getElementById("LockCheckbox 1_20").checked = !0),
		(document.getElementById("LegendaryWeapon").checked = !0)),
		EmployWorkers();
} else {
	let e = !1,
		t = !1,
		n = !1;
	queryString.substr(1), (queryString = decode(queryString));
	for (let e = 0; e < queryString[0].length; e++) document.getElementById(perkButtonIdList[queryString[0][e]]).click();
	var PerkCardList = document.getElementsByClassName("PerkCard");
	for (let e = 0; e < queryString[1].length; e++)
		PerkCardList[e].children[1].firstChild.textContent =
			"+" +
			String(3 * queryString[1][e]) +
			" " +
			PerkCardList[e].children[1].firstChild.textContent.substring(PerkCardList[e].children[1].firstChild.textContent.indexOf(" ") + 1);
	for (let r = 0; r < queryString[2].length; r++)
		(document.getElementById(LockCheckboxIdList[queryString[2][r]]).checked = !0),
			18 == queryString[2][r] && (t = !0),
			8 == queryString[2][r] && (n = !0),
			(29 != queryString[2][r] && 30 != queryString[2][r]) || (e = !0);
	1 == t &&
		((document.getElementById("LockCheckbox 1_10").checked = !0),
		(document.getElementById("LockCheckbox 1_3").checked = !0),
		(document.getElementById("LockCheckbox 1_11").checked = !0),
		(document.getElementById("LockCheckbox 1_20").checked = !0),
		(document.getElementById("LegendaryWeapon").checked = !0)),
		1 == n &&
			((document.getElementById("LockCheckbox 1_0").checked = !0),
			(document.getElementById("LockCheckbox 1_8").checked = !0),
			(document.getElementById("LockCheckbox 1_9").checked = !0),
			(document.getElementById("LockCheckbox 1_18").checked = !0),
			(document.getElementById("LegendaryWeapon").checked = !0)),
		1 == e && (document.getElementById("LegendaryWeapon").checked = !0),
		EmployWorkers();
}
