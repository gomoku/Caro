************************************************** *****

var rMax; cMax; gMax;
var cost,pos,dir;
var whoTurns;
var lookForEmpty=new Image();
var lookForYou=new Image();
var lookForMe=new Image();
var Go = new Array ();
************************************************** *****
checkImage(counter,image) {
return document.images[counter]==image
}
************************************************** *****
checkBoard() {
for(i=0;i<cMax;i++) if(checkImage(i,lookForEmpty)) return false
alert ('Bảng đầy, hãy chơi lại ván khác !')
}
************************************************** *****
function AI() {
whoWins=checkForWinner(lookForMe)
whoWins=="Idle" ? whoTurn="You" : alert(whoWins + "wins")
}
************************************************** *****
function dropDown(posCol) {
whoTurn == "You" ? (dropIt(posCol) ? whoTurn = "Me" : return) : return
AI()
}
************************************************** *****
function dropIt(posCol) {
for (i=posCol;i<rMax*cMax;i=i+cMax)
if (! checkImage(i,lookForEmpty)) return stickIt(i-cMax)
return checkBoard()
}
************************************************** *****
function stickIt(pos) {
return (pos>-1 && document.images[pos]=(whoTurn == "You" ? lookForYou : lookForMe) )
}
************************************************** *****
function checkRound(counter,next,loop,lookForMe,lookForYou) {
gramMa=0;
for (i=0;i<gMax;i++)
if (checkImage(counter + i*loop,lookForYou)
|| checkImage(counter + i*loop+cMax,lookForEmpty)) return false
else if (checkImage(counter + i*loop, lookForMe)
|| counter + i*loop == next) gramMa ++
if checkImage(counter,lookForEmpty) {
if (counter==pos && gramMax == cost) cost++
if checkImage(counter+gMax*loop,lookForEmpty) gramMa ++}
if ( gramMa > cost ) {cost=gramMa ; pos = counter ; dir=loop}
return (cost>=gMax)
}
************************************************** *****
function checkWin(counter,next,lookForMe,lookForYou){
hang=Math.floor(counter/cMax);cot=counter-hang*cMax;
return ((cot < cMax - gMax + 1
&& checkRound(counter,next,1,lookForMe,lookForYou))
|| (hang < cMax - gMax + 1
&& checkRound(counter,next,cMax,lookForMe,lookForYou) )
|| (hang < cMax - gMax + 1
&& cot < cMax - gMax + 1
&& checkRound(counter,next,cMax+1,lookForMe,lookForYo u))
|| (hang > cMax - gMax
&& cot < cMax - gMax + 1
&& checkRound(counter,next,-cMax-1,lookForMe,lookForYou)))
}
************************************************** *****
function checkForNext(next,lookForMe) {
if (next<0) return false
start=next-(gMax-1)*cMax; if (start<0) start=0
stop=next+(gMax-1)*cMax;if (stop>rMax*cMax) stop=rMax*cMax
for (i=start;i<stop;i++)
if (checkWin(i,next,lookForYou,lookForMe)
|| checkWin(i,next,lookForMe,lookForYou)) return true
return false
}
************************************************** *****
function checkForWinner (lookForMe) {
cost=0;pos=0;dir=0;
for (i=0;i<rMax*cMax;i++)
if (checkWin(i,-1,lookForYou,lookForMe)) return "You"
cost--
for (i=0;i<rMax*cMax;i++)
if (checkWin(i,-1,lookForMe,lookForYou)) return "Me"
feet=0
if (cost!=0) {
for (i=0;i<gMax;i++)
if (checkImage(pos + i*dir, lookForEmpty)
&& (!checkForNext(pos + i*dir -cMax,lookForMe)
|| feet==0)) {Go[feet]=pos + i*dir ; feet++}
stickIt(Go[Math.floor(Math.round()*feet)])
}
else {
while (!dropIt(Math.floor(Math.round()*cMax)))
dropIt(Math.floor(Math.round()*cMax))
}
return "Idle"
}
************************************************** *****
function makeBoard() {
rMax=row.op.item(row.selectedIndex).innerHTML
//<select id=row><option id=op></option></select>
rMax=col.op.item(col.selectedIndex).innerHTML
gMax=gra.op.item(gra.selectedIndex).innerHTML
whoTurns = (box.checked ? "You" : "Me")
//<input type=checkbox id=box>
lookForEmpty.src=bground.op.item(bground.selectedI ndex).innerHTML + ".gif"
lookForYou=forYou.item(forYou.selectedIndex)
//<img id=forYou src="you.gif">
lookForMe=forMe.item(forMe.selectedIndex)
str="<table>"
for (i=0;i<rMax;i++) {
str+="<tr>"
for (j=0;j<cMax;j++)
str+=['<td><a href="javascript:dropDown('+j+')">
<img src="'+lookForEmpty+'" height=20 width=20></a></td>']
str+="<tr>"
}
Board.innerHTML=str + "</table>" //<div id=Board></div>
}