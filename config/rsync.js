var path = require('path');
var user = process.argv[2];
var domain = process.argv[3] || 'mwdev';
if (!user) {
  console.log('need to pass username with "-- [USERNAME]" argument');
  process.exit(1);
}
require('child_process').execSync('rsync -rvu --delete --perms --chmod=a+rwx ' + path.join(__dirname, "../build/") + ' ' + user + '@' + domain + '.webmaster.ibm.com:/opt/IBM/WebSphere/HTTPServer/htdocs/campaigns/', { stdio: 'inherit' });