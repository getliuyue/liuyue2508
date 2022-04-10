var ACPDIVID="ACPList";			//ACP��ID
var ACPTABID="ACPTAB";			//ACP���б��ID
var TRColor="#FFFFFF";			//��Ĭ�ϱ���ɫ
var TRselectedColor="#EAEAEA";	//ѡ��ʱ�е���ɫ
var ACPHeight=200;				//ACP��߶�
//=======================����ACP��=======================
document.writeln("<style>");
document.writeln("#ACPList {");
document.writeln("position: absolute;");
document.writeln("z-index: 2;");
document.writeln("clear:both;");
document.writeln("display:none;");
document.writeln("overflow-y:auto;");
document.writeln("overflow-x:hidden;");
document.writeln("scrollbar-face-color:#FFFFFF;");
document.writeln("scrollbar-shadow-color:#94c6e1;");
document.writeln("scrollbar-highlight-color:#94c6e1;");
document.writeln("scrollbar-3dlight-color:#FFFFFF;");
document.writeln("scrollbar-darkshadow-color:#FFFFFF;");
document.writeln("scrollbar-track-color:#FFFFFF;");
document.writeln("scrollbar-arrow-color:#94c6e1;");
document.writeln("border:1px solid #999;");
document.writeln("background-color:#fff;");
document.writeln("table {color:#666666;}");
document.writeln("a:link,a:hover,a:active,a:visited{color: #1875C6; text-decoration: none;}");
document.writeln("}");
document.writeln("</style>");

document.writeln("<div id=\""+ACPDIVID+"\"></div>");
//=======================================================

//=======================================================
//�ж������
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject)
	Sys.ie = ua.match(/msie ([\d.]+)/)[1];
	else if (document.getBoxObjectFor)
    	Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
	//else if (window.MessageEvent && !document.getBoxObjectFor)
		//Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
	else if (window.opera)
		Sys.opera = ua.match(/opera.([\d.]+)/)[1];
	else if (window.openDatabase)
		Sys.safari = ua.match(/version\/([\d.]+)/)[1];
//=======================================================

//=============================================================
//��ȡ���ض���Ĳ�������ȷ��ACP����ʾ��λ��
function getAbsoluteCoords (e) {
	var t = e.offsetTop; var l = e.offsetLeft; var w = e.offsetWidth; var h = e.offsetHeight;
	while  (e=e.offsetParent) { t += e.offsetTop; l += e.offsetLeft; }; 
	return { top: t, left: l, width: w, height: h, bottom: t+h, right: l+w };
}
//=============================================================

//=============================================================
//��ʾACP��
function ACPList(reOBJID,ACPData){//���÷�ʽ�����صĶ���ID�����õ�����Դ
	var reOBJ=document.getElementById(reOBJID);		//���ض���
	var reOBJValue=reOBJ.value.toUpperCase();		//���ض���ĵ�ǰֵ
	if(reOBJValue!=""){
		rowNo=-1;					
		document.getElementById("ACPList").scrollTop=0;	//����������λ��
		var showCharTOP="<table width=100% style=font-size:14px;color:666666 id=\""+ACPTABID+"\">";	//ACP���ͷ��
		var showChar="";
		//=======================��λ��=======================
		var ACPDIVOBJ=document.getElementById(ACPDIVID);
		var reOBJStyle=getAbsoluteCoords(reOBJ);
		ACPDIVOBJ.style.left=reOBJStyle.left+"px";
		ACPDIVOBJ.style.top=reOBJStyle.top+reOBJStyle.height+"px";
		ACPDIVOBJ.style.width=reOBJStyle.width-2+"px";
		ACPDIVOBJ.style.height=ACPHeight + "px";
		ACPDIVOBJ.style.display="block";
		//====================================================

		//====================================================
		//ͨ��ACPData���ɱ��
		for(var i=0;i<ACPData.length;i++){//ACPData[i][4]Ϊ������ID
			//var CompareChar=ACPData[i][1];
			//if(CC==1)CompareChar=ACPData[i][0] + "/" + ACPData[i][1] + "/" + ACPData[i][2]

				if((ACPData[i][1].indexOf(reOBJValue)!=-1)||(ACPData[i][3].indexOf(reOBJValue)==0)){
					var tmpChar=ACPData[i][0] + "/" + ACPData[i][1] + "/" + ACPData[i][2];
					showChar=showChar + "<tr ID=" +ACPData[i][4] + "><td style=\"cursor:pointer;color:#666666;height:20px\" onMouseOver=\"javascript:this.style.backgroundColor='"+TRselectedColor+"'\" onMouseOut=\"javascript:this.style.backgroundColor='"+TRColor+"'\" onclick=\"javascript:ACPCLick('"+tmpChar+"','"+reOBJID+"','"+ACPData[i][4]+"')\">" + tmpChar + "</td></tr>";
				}


		}
		//ACP����������
		//====================================================

		if(showChar!=""){				//ƴ�ӱ��β�����������д��ACP����
			showChar=showCharTOP + showChar + "</table>";
			ACPDIVOBJ.innerHTML=showChar;
		}else{
			//HideACPList();
		}
	}
}
//=============================================================

//=============================================================
//����ѡ��ACP���е�ĳ��
var rowNo=-1;
function ACPKEYDOWN(reOBJID,hitKey){
	if(document.getElementById(ACPDIVID).style.display=="none"||document.getElementById(ACPDIVID).style.display=="")return;
	var ACPLH=24;			//Ϊ���ƹ�����λ���趨�ĸ�
	if(Sys.ie)ACPLH=22;

	if(hitKey==38){
		for(var k=0;k<document.getElementById(ACPTABID).rows.length;k++)document.getElementById(ACPTABID).rows[k].style.backgroundColor=TRColor;
        	if(rowNo==0)rowNo++;
		//���ƹ�����λ��
		var tmpRN=rowNo%document.getElementById(ACPTABID).rows.length;
		
		if(tmpRN!=0){//���в��ɽ������Ʋ���
			if(rowNo>6){
				document.getElementById(ACPDIVID).scrollTop=document.getElementById(ACPDIVID).scrollTop-ACPLH;
			}else{
				document.getElementById(ACPDIVID).scrollTop=0;
			}
	       	document.getElementById(ACPTABID).rows[--rowNo%document.getElementById(ACPTABID).rows.length].style.backgroundColor=TRselectedColor;

			if(!(Sys.ie)){
				document.getElementById(reOBJID).value=document.getElementById(ACPTABID).rows[rowNo%document.getElementById(ACPTABID).rows.length].textContent;
			}else{
				document.getElementById(reOBJID).value=document.getElementById(ACPTABID).rows[rowNo%document.getElementById(ACPTABID).rows.length].innerText;
			}
		}
	}

	if(hitKey==40){
		for(var k=0;k<document.getElementById(ACPTABID).rows.length;k++)document.getElementById(ACPTABID).rows[k].style.backgroundColor=TRColor;
		//���ƹ�����λ��
		var tmpRN=rowNo%document.getElementById(ACPTABID).rows.length;

		if(tmpRN>6)document.getElementById(ACPDIVID).scrollTop=(tmpRN-2)*ACPLH;
		if(tmpRN>document.getElementById(ACPTABID).rows.length-2)document.getElementById(ACPDIVID).scrollTop=0;
       	document.getElementById(ACPTABID).rows[++rowNo%document.getElementById(ACPTABID).rows.length].style.backgroundColor=TRselectedColor; 

		if(!(Sys.ie)){
			document.getElementById(reOBJID).value=document.getElementById(ACPTABID).rows[rowNo%document.getElementById(ACPTABID).rows.length].textContent;
		}else{
			document.getElementById(reOBJID).value=document.getElementById(ACPTABID).rows[rowNo%document.getElementById(ACPTABID).rows.length].innerText;
		}
   	}

	//�˴������Ӵ��룬��������Ҫ��Ĳ��������޸�
	//var FID=document.getElementById(ACPTABID).rows[rowNo%document.getElementById(ACPTABID).rows.length].id;
	//document.getElementById("FID").value=FID;
}



	
//=============================================================
//���ACP���е�ĳ��
function ACPCLick(reValue,reOBJID,hitFID){	//����ֵ�����ص������ID��ѡ���е�ID
	document.getElementById(reOBJID).value=reValue;
	document.getElementById(reOBJID).focus();

	//�˴������ӣ������ض����VALUE��Ϊ�գ���ִ��ĳ������
	//document.getElementById("FID").value=hitFID;
	//if(document.getElementById(reOBJ).value!="")doSearch();
}


//=============================================================
//����ACP��
function HideACPList(){
	document.getElementById("ACPList").style.display="none";
}

//=============================================================
//����հ״�����ACP��
window.document.onclick= Object_Onclick;
function Object_Onclick(){
	if(Sys.ie){
		cstrID=document.activeElement.id;
	}else{
		cstrID=event.target.id;
	}

	if(cstrID==""){
		HideACPList();
	}
} 
