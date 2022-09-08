/**
 * Based on Bionic/Torpedo Reader
 * https://pastebin.com/B8e4ycNC
 * 
 * Updated to skip links and line breaks. 
 * Exceptions for images will also need to be tested and developed
 * skips tags & links 
 */
var spans = document.getElementsByTagName('p');

for(var i = 0; i < spans.length; i++) {
    
    var inner = spans[i].innerHTML;
    inner = inner.split(' ');    
    var newInner = "";

    for(var k = 0; k < inner.length; k++) {

        if ( inner[k].includes('<br>') ){
            wordSplit = inner[k].split('<br>');
            inner[k] = [wordSplit[0], '<br>', wordSplit[1]];
        }
        
        
        // console.log( inner[k] );
        if ( inner[k].includes('<iframe') && !inner[k].includes('>') ){   
            var z = k+1;
            combotag = inner[k] + " " + inner[z];
            
            
            while ( !combotag.includes('</iframe>') ) {
                combotag = combotag + " " + inner[z];
                z++;
            }

            inner[k] = combotag;

            for(var q = 1; q < z; q++) {
                inner[q] = "";
            }
        }
        else if ( inner[k].includes('<') && inner[k].includes('>') ){
            wordSplit = inner[k].split('>');
            inner[k] = [wordSplit[0] + '>', wordSplit[1]];
        }
        else if ( inner[k].includes('<') && !inner[k].includes('>') ){   
            combotag = inner[k] + " " + inner[k+1];
            wordSplit = combotag.split('>');
            inner[k] = [wordSplit[0] + '>', wordSplit[1]];
            inner[k+1] = "";
        }
    }

    inner = inner.flat();

    // console.log( inner );

    for(var j = 0; j < inner.length; j++) {  
        var thisWord = inner[j];
        var breakMarkup = "";
        // if (inner[j] == ' ' || inner == false || inner[j] == '' || inner == undefined || inner[j].length == 0 || !inner[j] || inner[j] == '\r'){
        //     continue;
        // }
    
        // if (!thisWord){
        //     continue;
        // }

        // console.log( thisWord );
        var hasBreak = thisWord.includes('<br>');
        if ( thisWord.includes('<br>') ){
            if (Array.isArray(hasBreak) && hasBreak.length > 1){
                breakMarkup = "<br>";
                thisWord = hasBreak[0];
            }
        } 
        var wordLength = thisWord.length;
        var firstHalfLength;
        
        if (wordLength % 2  != 0 && wordLength > 1){
            firstHalfLength = ((wordLength - 1) / 2) + 1;
        }else if (wordLength > 1){
            firstHalfLength = wordLength / 2;
        }else{
            firstHalfLength = 1;
        }

        let isLink = thisWord.includes("href=");
        let isTag = thisWord.includes("<");
        let closeLink = thisWord.includes("</a");
        if (closeLink == true){
            thisWord = thisWord + ">";
        }

        if (firstHalfLength > 0 && isLink !== true && isTag !== true) {
            newInner += ' <b>' + thisWord.substring(0,firstHalfLength) + '</b>' + thisWord.substring(firstHalfLength) + breakMarkup;
        } else {
            newInner += thisWord;
        }
        
    }
    if (newInner !== "undefined" ) {
        spans[i].innerHTML = newInner;
    }
}