# simple-sitemap-parser


## Usage Example
```js
const SimpleSitemapParser = require('@dfrankes/simple-sitemap-parser');
await SimpleSitemapParser.parser({
	'sitemap_url': 'https://mywebsite.local/sitemap.xml',
	'options': {
		'headers': {
			'user-agent': 'My Sitemap Parser'
		},
		'proxy': false,
		'timeout': 1000,
		'agentOptions': {
			'keepAlive': true
		},
	},
	'validateUrl': async(url) => {
		return url;
	},
	'onSuccess': async(urls) => {
		// all urls items
	},
	'onError': async(error, urls) => {
        // the error, and list of parsed urls
	}
});
```
