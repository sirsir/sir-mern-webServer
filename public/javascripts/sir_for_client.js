function encodeBackslach(strIn){
    strOut = strIn
    strOut = strIn.replace("\\n","\n")
    strOut = strIn.replace("\\t","\t")


    return strOut
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
          //.replace(/\t/g,"\\t")
          //.replace(/\n/g,"\\n")
  ;


}

function beautifier_notupdate(codeIn, indent, language){
  codeOut = ""

  indent = indent.replace( /\\t/g,"\t")

  if (language.toString().toLowerCase() == 'javascript'){
    indentPlus = [
      /\{$/m,/\[$/m
    ];
    indentMinus = [
      /^\}/m,/^\]/m
    ];
    indentIgnore =[
    ];

  }else if (language.toString().toLowerCase() == 'ruby'){
    indentPlus = [
      /\{$/m,
      /\[$/m
    ];
    indentMinus = [
      /^\}/m,
      /^\]/m
    ];
    indentIgnore =[
    ];

  }

  strTemp =STRING_unifyNewLine(codeIn);
  //console.log('fffffff')

  indentSum = 0

  match = /^[ \t]*/.exec(strTemp);

  indent0 = match[0];

  strTemp = strTemp.replace( /^[ \t]+/mg, "")
  strTemp = strTemp.replace( /[ \t]+$/mg, "")

  strTemp = strTemp.split('\n')

  strCodeOut = ''
  $.each(strTemp, function(i,line){
    is_indentIgnore = false
    $.each(indentIgnore, function(i_ignore,ignore){
      if (line.match(ignore)){
        is_indentIgnore = true;
        return false;
      }
    });

    is_indentPlus = false
    $.each(indentPlus, function(i_plus,plus){
      if (line.match(plus)){
        is_indentPlus = true;
        return false;
      }
    });

    is_indentMinus = false
    $.each(indentMinus, function(i_minus,minus){
      if (line.match(minus)){
        is_indentMinus = true;
        return false;
      }
    });

    if (is_indentMinus && ! is_indentIgnore){
      indentSum = indentSum - 1
      if (indentSum < 0){
        indentSum = 0
      }
    }

    strCodeOutNew = indent0+ indent.repeat(indentSum)+ line +"\n"

    strCodeOut += strCodeOutNew

    if (is_indentPlus && ! is_indentIgnore){
      indentSum = indentSum + 1
    }

    /*
    if RegExpExists(l, "^ *':reset indent", "i") Then

    indentSum = 0
    End If
    */

  })

  return strCodeOut
}

function STRING_unifyNewLine(strIn){
  return strIn.replace(/\r\n/g,'\n')
}
