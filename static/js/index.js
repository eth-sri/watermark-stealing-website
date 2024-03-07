function copyBibtex() {
	var copyText = document.getElementById("BibTeX");
	navigator.clipboard.writeText(copyText.innerHTML);
}

function loadExamples() {
	// prepare list of urls 
	var texts = ["game_orig", "game_ours", "game_server", "memory_orig", "memory_ours", "memory_server", "phd_response", "news_response"]
	var urls = texts.map(text => "static/texts/" + text + ".html")
	var ids = texts.map(text => "text-" + text)
	// zip urls and ids 
	var zipped = urls.map(function(e, i) {
		return [e, ids[i]]
	})

	let promises = [] 
	zipped.forEach(function(z) {
		let promise = fetch(z[0])
		.then((response) => response.text())
		.then((html) => {
			document.getElementById(z[1]).innerHTML = html;
		})
		.catch((error) => {
			console.warn(error)
		});
		promises.push(promise);
	})

	// at the end update the detector
	Promise.all(promises).then(() => {
		updateDetector.call(document.querySelector("#detectorMode"));
	});
}

function updateDetector() {
	bodies=document.querySelectorAll(".example.active")[0].querySelectorAll(".chat-body")
	detectors=document.querySelectorAll(".example.active")[0].querySelectorAll(".chat-detector")
	if(this.checked) {
	  // Checkbox is checked
	  console.log(bodies[1].childNodes)
	  bodies.forEach(b => b.childNodes.forEach(e => !e.classList || e.classList.add('active')))
	  detectors.forEach(e => !e.classList || e.classList.add('active'))
	} else {
	  // Checkbox is not checked
	  bodies.forEach(b => b.childNodes.forEach(e => !e.classList ||  e.classList.remove('active')))
	  detectors.forEach(e => !e.classList || e.classList.remove('active'))
	}
}

function selectExample() {
	document.querySelectorAll(".example-buttons-inner > .example-button").forEach(e => !e.classList || e == this || e.classList.remove('active'))
	document.getElementsByClassName("example-box")[0].childNodes.forEach(e => !e.classList || e.classList.remove('active'))
	const name = this.classList[0]
	const example = document.querySelector(`.example-${name}`)
	this.classList.add('active')
	example.classList.add('active')
	updateDetector.call(document.querySelector("#detectorMode"))
}




window.addEventListener('load', function() {
	loadExamples()
	document.querySelectorAll(".example-buttons-inner > .example-button").forEach(e => e.addEventListener('click', selectExample))
	this.document.getElementById('detectorMode').addEventListener('change', updateDetector)
});