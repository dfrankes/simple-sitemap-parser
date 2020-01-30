exports.parser = (settings) => {
	const request = require('request');
	const sax = require('sax');
	return new Promise((async (resolve, reject) => {
		let parsed_urls = [];
		const parser = sax.createStream(false, {
          trim: true,
          normalize: true,
          lowercase: true
        });
		
		request.defaults(settings.options);
		request.get(settings.sitemap_url).pipe(parser);
		parser.on('error', (err) => {
			settings.onError(err, parsed_urls);
			resolve(true);
		});
		parser.on('text', async(text) => {
			const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
			const match = regex.exec(text);
			if(match){
				const url = await settings.validateUrl(match[0]);
				parsed_urls.push(url);
			}
		});
		parser.on('end', () => {
			settings.onSuccess(parsed_urls);
			resolve(true);
		});	
		
	}).bind(settings));
}