console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function html(restString, name, escapeString) {

  var replacedString = escapeString.replace(/&/g,'&amp;')
                                    .replace(/'/g, '&apos;')
                                    .replace(/"/g,'&quot;')
                                    .replace(/</g,'&lt;')
                                    .replace(/>/g, '&gt;');  
  var replacedUserString = name.replace(/&/g,'&amp;')
                                    .replace(/'/g, '&apos;')
                                    .replace(/"/g,'&quot;')
                                    .replace(/</g,'&lt;')
                                    .replace(/>/g, '&gt;'); 
  
  
  return `<b>${replacedUserString} says</b>: "${replacedString}\"`;
    
}