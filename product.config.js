var oPath = {
	"music": "D:/svn/carrier/music-website/branches/dev/webapp/public",
	"gold": "D:/svn/carrier/gold-website/branches/dev/webapp/public",
	"esports": "D:/svn/carrier/esports-webiste/branches/dev/webapp/public",
  "demo":"F:/labs/es6-env/src"
};
module.exports = {
  "music": {
  	path: oPath.music,
  	browsersync: {
  		proxy: "music.localhost",
  		files: `${oPath.music}/**`
  	},
  	alias: {
  		resolve: ['.js', '.esm.js', '.d.js'],
  		entries: [
  			{find: 'util', replacement: `${oPath.music}/js/util`},
        	{find: 'api', replacement: `${oPath.music}/js/api`}
  		]
  	}
  },
  "gold": {
	  path: oPath.test
  },
  "demo": {
    path: oPath.demo
  },  
  "esports": {
	path: oPath.esports,
	browsersync: {
		proxy: "esports.localhost",
		files: `${oPath.esports}/**`
	},
	alias: {
		resolve: ['.js', '.esm.js', '.d.js'],
		entries: [
			{find: 'util', replacement: `${oPath.esports}/js/util`},
		  {find: 'api', replacement: `${oPath.esports}/js/api`}
		]
	}
  }
}
