// src/ffapl.js
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { continuedIndent, delimitedIndent, indentNodeProp } from "@codemirror/language";

// src/parser.js
import { LRParser, LocalTokenGroup } from "@lezer/lr";

// src/highlight.js
import { styleTags, tags as t } from "@lezer/highlight";
var highlight = styleTags({
  "program procedure function const": t.definitionKeyword,
  "to step new": t.operatorKeyword,
  "for while if else return break": t.controlKeyword,
  BooleanLiteral: t.bool,
  NumberLiteral: t.number,
  StringLiteral: t.string,
  LineComment: t.lineComment,
  BlockComment: t.blockComment,
  PrimitiveType: t.standard(t.typeName),
  Identifier: t.variableName,
  "ProcFuncCall/Identifier": t.function(t.variableName),
  "Program/Identifier Procedure/Identifier Function/Identifier": t.function(t.definition(t.variableName)),
  ArithOp: t.arithmeticOperator,
  LogicOp: t.logicOperator,
  CompareOp: t.compareOperator,
  "Equals AssignOp": t.definitionOperator,
  "( )": t.paren,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
  ".": t.derefOperator,
  ", ;": t.separator,
  "#": t.meta
});

// src/parser.js
var spec_Identifier = { __proto__: null, program: 10, const: 20, GF: 28, new: 36, Integer: 42, Boolean: 44, String: 46, Prime: 50, Polynomial: 52, EC: 56, Z: 58, true: 90, false: 90, Random: 94, x: 108, PAI: 120, RandomPoint: 306, RandomPointSubfield: 306, MOD: 136, AND: 142, OR: 144, XOR: 146, procedure: 152, PseudoRandomGenerator: 160, RandomGenerator: 162, Record: 174, EndRecord: 176, SameAs: 180, BaseGF: 184, BaseZ: 186, break: 196, if: 202, else: 206, while: 210, for: 214, to: 218, step: 220, function: 224, return: 230 };
var parser = LRParser.deserialize({
  version: 14,
  states: "! pO]QPOOPbOPOOOgQPOOPlO`O'#C^POOO)C@})C@}OwQPOOPOOO'#Et'#EtP|O`O,58xPOOO,58x,58xO!XQPO'#CdQOQPOOPOOO-E8r-E8rPOOO1G.d1G.dO!yQPO'#DlOOQO'#Eu'#EuO!XQPO,59OOOQO'#FU'#FUO#_QPO,59OO#vQPO'#EaOOQO'#E_'#E_OOQO'#Ec'#EcO#{QPO'#FVOOQO'#FV'#FVO$cQPO'#E^OOQO'#FQ'#FQO$pQPO,59OO$zQPO,59OO%PQPO'#CeO%UQPO'#EdO%UQPO'#EhO%ZQPO'#EjO%`QPO'#DyO%eQPO'#EoO&eQPO,5:WO%jQPO'#DmO&lQPO'#DmO&qQPO'#FRO&vQPO,5:mO'OQPO,5:mO%jQPO,5:zO'|QPO,5:zOOQO-E8s-E8sO#_QPO1G.jO$pQPO1G.jO(RQPO1G.jOOQO-E9S-E9SO(WQPO,5:{OOQO,5;q,5;qO(]QPO'#DlOOQO-E9T-E9TOOQO-E9O-E9OOOQO1G.j1G.jO(kQPO,59PO%jQPO'#EfO(pQPO,5;OO(pQPO,5;SO(uQPO,5;UO(zQPO,5:eO)PQPO,5;ZO)UQQO'#D`O)|QPO'#DkOOQO'#DY'#DYO+eQSO'#DXOOQO1G/r1G/rO+uQPO1G/rO+}QPO'#DoOOQO'#DX'#DXO%jQPO'#DXO,SQPO'#DXOOQO'#DU'#DUO,ZQPO'#DUO.SQSO'#FiOOQO'#DT'#DTO/_QSO'#FhOOQO'#DS'#DSO0mQSO'#FgOOQO'#DR'#DRO1uQSO'#FfOOQO'#DQ'#DQO2PQQO'#FeOOQO'#DP'#DPO2}QPO'#FdOOQO'#DO'#DOO3xQPO'#FcOOQO'#C}'#C}O4pQPO'#FbOOQO'#C|'#C|OOQO'#Cl'#ClO5eQPO'#CmO7^QSO'#D[O7hQPO,5:XO8wQPO,5:XOOQO,5;m,5;mOOQO-E9P-E9PO'OQPO1G0XOOQO'#ES'#ESO9XQPO'#ESO9aQPO1G0XOOQO'#Cp'#CpOOQO'#Ct'#CtO9fQPO'#CiO9kQPO'#CiO9pQPO'#CiO9uQPO'#ETO9zQPO'#ETO:PQPO'#EUO:XQPO'#EXO:^QPO'#EZOOQO1G0f1G0fO%jQPO1G0fO:cQPO7+$UO#_QPO7+$UOOQO7+$U7+$UO:hQPO'#ERO:pQPO1G0gO;WQPO1G.kO;eQPO,5;QO#_QPO'#EQO;jQPO1G0jOOQO1G0n1G0nO%jQPO1G0pO<XQPO1G0PO<aQPO1G0uOOQO'#Da'#DaO<iQPO'#DaO<nQPO'#DaO<yQPO,59zO=RQPO'#DXO=`QPO'#D[O=gQPO'#DcO=rQPO,5:TO=wQPO,5:VO=|QPO,5:TOOQO,59s,59sO%jQPO'#ExO>RQPO7+%^OOQO7+%^7+%^O?eQSO,5:ZO?uQPO,59sO?zQPO,59sOOQO,59p,59pO@SQPO'#EyOAeQSO,5<TO@SQPO'#EzOBpQSO,5<SO@SQPO'#E{ODOQSO,5<RO@SQPO,5<QO@SQPO,5<PO@SQPO'#E|OD]QPO,5<OO@SQPO'#E}OEWQPO,5;}O@SQPO'#FOOFOQPO,5;|OOQO'#Co'#CoOOQO'#Cw'#CwOFsQWO'#CwOFxQPO,59XO%jQPO,59vOHXQPO1G/sOOQO1G/s1G/sOHiQPO7+%sOOQO'#FS'#FSOHnQPO,5:nOOQO7+%s7+%sO%jQPO,59TOHvQPO,59TO%jQPO,59TO%jQPO,5:oO%jQPO,5:oOIOQPO,5:pOOQO,5:p,5:pOIWQPO,5:sOI]QPO,5:uOOQO7+&Q7+&QOOQO<<Gp<<GpOIbQPO<<GpOIgQPO7+&ROOQO'#Ch'#ChOIlQPO7+$VOOQO1G0l1G0lO#_QPO,5:lOIqQPO,5:lOIvQPO7+&UOJOQPO7+&[OJTQPO'#D{O(pQPO7+%kOJ]QPO7+%kOJeQPO7+&aOJjQPO7+&aOOQO,59{,59{O)UQQO'#EwOJrQPO1G/fOOQO1G/f1G/fOJzQPO,5:ZOKXQPO,59}O%jQPO1G/oOOQO1G/q1G/qOOQO1G/o1G/oOKyQSO,5:XOOQO,5;d,5;dOOQO-E8v-E8vOOQO<<Hx<<HxOOQO1G/u1G/uOOQO1G/_1G/_OLZQPO1G/_OOQO,5;e,5;eOOQO-E8w-E8wOOQO,5;f,5;fOOQO-E8x-E8xOOQO,5;g,5;gOOQO-E8y-E8yOOQO1G1l1G1lOOQO1G1k1G1kOOQO,5;h,5;hOOQO-E8z-E8zOOQO,5;i,5;iOOQO-E8{-E8{OOQO,5;j,5;jOOQO-E8|-E8|OLcQPO,59cOOQO'#Ev'#EvOLwQPO1G.sOMlQPO1G/bOOQO7+%_7+%_OOQO<<I_<<I_OOQO-E9Q-E9QOMtQPO1G.oOMyQPO1G.oONOQPO1G.oONTQPO1G.oONYQPO1G0ZON_QPO1G0ZOOQO1G0[1G0[ONgQPO1G0_ONlQPO1G0aOOQOAN=[AN=[ONqQPO<<ImO%jQPO<<GqONvQPO1G0WOOQO1G0W1G0WOOQO<<Ip<<IpO%jQPO<<IvON{QPO,5:gO! TQPO,5:gOOQO<<IV<<IVO! _QPO'#FTO! dQPO<<IVO(pQPO<<IVO! TQPO<<I{O! lQPO<<I{O! tQPO<<I{OOQO,5;c,5;cOOQO-E8u-E8uOOQO7+%Q7+%QOOQO1G/i1G/iO! yQPO7+%ZO!!OQSO1G/sOOQO7+$y7+$yO!!`QPO1G.}OOQO-E8t-E8tOOQO7+$|7+$|O%jQPO7+$|O%jQPO7+$ZO%jQPO7+$ZO%jQPO7+$ZO!!eQPO7+$ZO%jQPO7+%uOOQO7+%u7+%uOOQO7+%y7+%yOOQO7+%{7+%{O!!sQPOAN?XO!!xQPOAN=]OOQO7+%r7+%rO!!}QPOAN?bO! TQPO1G0ROOQO'#D|'#D|O!#VQPO'#D|OOQO1G0R1G0ROOQO'#D}'#D}OOQO,5;o,5;oOOQO-E9R-E9RO(pQPOAN>qOOQOAN>qAN>qO!#eQPOAN?gO!#jQPOAN?gO! TQPOAN?gOOQO<<Hu<<HuO!#oQPO'#FiO!#vQPO'#FhO!$TQPO'#FgO!$[QPO7+$iO!$aQPO<<HhO!$fQPO<<GuO!$kQPO<<GuO!$pQPO<<GuO!$uQPO<<GuO!$zQPO<<IaOOQOG24sG24sOOQOG22wG22wOOQOG24|G24|O%jQPOG24|OOQO7+%m7+%mO!%PQPO,5:hOOQOG24]G24]O!%_QPO'#EqOOQOG25RG25RO! TQPOG25RO!#eQPOG25RO!%iQPO,5<TO!%pQPO,5<SO!%}QPO,5<ROOQO<<HT<<HTOOQOAN>SAN>SOOQOAN=aAN=aO%jQPOAN=aO!&UQPOAN=aO!&^QPOAN=aOOQOAN>{AN>{O(pQPOLD*hO!%_QPO,5;]O!&cQPO,5;]O!#eQPOLD*mOOQOLD*mLD*mO!&hQPOG22{O!&mQPO'#FPO!&rQPOG22{OOQOG22{G22{OOQO!$'NS!$'NSO!&cQPO1G0wO!&zQPO1G0wO%jQPO'#ErOOQO!$'NX!$'NXO!'PQPOLD(gO!'XQPO,5;kOOQO-E8}-E8}OOQOLD(gLD(gO!'^QPO7+&cOOQO7+&c7+&cO!'cQPO,5;^O!'hQPO!$'LROOQO!$'LR!$'LRO%jQPO1G1VOOQO<<I}<<I}OOQO1G0x1G0xOOQO!)9Am!)9AmOOQO7+&q7+&qO!'pQPO'#DmO!'uQPO'#DoOKXQPO'#DUO!'zQPO,5:XO!(PQPO'#EyO!(PQPO'#EzO!(PQPO'#E{O!(PQPO,5<QO%jQPO'#DmO!(ZQSO'#Ff",
  stateData: "!(h~O#|OSPOS#}PQ~OTQO~O#}RO~OSTO~O$OUO$PUO$QWO~OVXO~O$OUO$PUO$Q[O~OS]OYkO![bO!noO#UcO#XlO#]mO#_nO#dpOU#QP~OZvO_qOnrO!bsO!lwO$^tO~OS]O![bO#UcO#XlO#]mO#_nOU#QP~OS!OO~O$R!PO~O![bO#UcO#XlO#]mO#_nO~OS!QOU#QX#g#QX~P$QO!noO#dpO~P#_OU!TO~OS!UO~O_!VO~OS!YO~OS!ZO~OS![O~OS!`OV!fO_!eOb!zOn!]Oy!hOz!hO}!_O!P!{O!R!_O!Y!_O![!^O$`!cO~O!Q!aO~P%jOS!}O~OS#OO~OZ#QO$^tO~O^#WOe#UOf#UOg#UOi#VOj#VOl#XOm#YO!r#ZO!s#[O!y#]O!|#^O#O#_O#P#_O~O!l#aO~OU#dO~O$^#fO~O_qOnrO!bsO!lwO~OZ#gO~OV#iO~O#`#lO~O_#mO~O_#nO~OS#sOV!fO_!eOn!]O}!_O!P#tO!R!_O!U#pO!W#uO!Y!_O![!^O$`(kO~O!^#xO$_#wO~P%jO_qOy{X!Q{X!X{X!d{X!e{X!f{X!i{X!j{X!k{X$^{Xo{X$R{XU{X#a{XZ{X!Z{XV{X#b{X~On(rO!b(jO!g{X!h{X~P*WO!Q#|O$^#zO~OS#}O~OU#yO~P%jOS!`OV!fO_!eOn!]O}!_O!P!{O!R!_O!Y!_O![!^O$`!cO~Oy$]X!Q$]X!d$]X!e$]X!f$]X!i$]X!j$]X!k$]X$^$]Xo$]X$R$]XU$]X#a$]XZ$]X!Z$]XV$]X#b$]X~O!X$RO!g$]X!h$]X~P,{Oy$[X!Q$[X!i$[X!j$[X!k$[X$^$[Xo$[X$R$[XU$[X#a$[XZ$[X!Z$[XV$[X#b$[X~O!d$TO!e$TO!f$TO!g$[X!h$[X~P.aO!Q$ZX!i$ZX!j$ZX!k$ZX$^$ZXo$ZX$R$ZXU$ZX#a$ZXZ$ZX!Z$ZXV$ZX#b$ZX~Oy$VO!g$ZX!h$ZX~P/rO!Q$YX!i$YX!j$YX!k$YX$^$YXo$YX$R$YXU$YX#a$YXZ$YX!Z$YXV$YX#b$YX~O!g$XO!h$YX~P0zO!h$YO!Q$XX!i$XX!j$XX!k$XX$^$XXo$XX$R$XXU$XX#a$XXZ$XX!Z$XXV$XX#b$XX~O!i$ZO!Q$WX!j$WX!k$WX$^$WXo$WX$R$WXU$WX#a$WXZ$WX!Z$WXV$WX#b$WX~O!j$]O!Q$VX!k$VX$^$VXo$VX$R$VXU$VX#a$VXZ$VX!Z$VXV$VX#b$VX~O!k$_O!Q$UX$^$UXo$UX$R$UXU$UX#a$UXZ$UX!Z$UXV$UX#b$UX~O^$bOe#UOf#UOg#UOi#VOj#VOl$bOm$cO~O_$eOy!OX!Q!OX!X!OX!d!OX!e!OX!f!OX!i!OX!j!OX!k!OX$^!OXo!OX$R!OXU!OX#a!OXZ!OX!Z!OXV!OX#b!OX~O!g!OX!h!OX~P6POo$fO~Oo!aay!aa!Q!aa!X!aa!d!aa!e!aa!f!aa!i!aa!j!aa!k!aa$^!aa$R!aaU!aa#a!aaZ!aa!Z!aaV!aa#b!aa~OnrO!bsO!l!aa!W!aa~P7mO$a$iO$R!vX~O$R$kO~O_$lO~O_$mO~O_$nO~O_$oO~O_$pO~OS#eO!z$rO~O_$sO~O_$tO~OU$vO~OZvO$^tO~OS$xO~Oe#UOf#UOg#UOi#VOj#VO~O^#WOl#XOm#YO~P:uO!Q${O~O#Z%OOS#WiU#Wi![#Wi#U#Wi#X#Wi#]#Wi#_#Wi#g#Wi~OS%QO!Q%RO~OS%QO!Q%TO~O!W#uO~O!W#uOo!TXy!TX~Oo%YOy%WO~OnrO!bsO!W{X~P*WO!W!OX~P6PO!X%[Oo!VXy!VX~O$^%]O~O!Z%^O~O!Z%_O~O!Q%cO$^#zO~Oy!ca!Q!ca!X!ca!d!ca!e!ca!f!ca!i!ca!j!ca!k!ca$^!cao!ca$R!caU!ca#a!caZ!ca!Z!caV!ca#b!ca~On(rO!b(jO!g!ca!h!ca~P>ZO!Q%eO~OU%eO$^#zO~Oy!hOz!hO~P,ZOy$]a!Q$]a!d$]a!e$]a!f$]a!i$]a!j$]a!k$]a$^$]ao$]a$R$]aU$]a#a$]aZ$]a!Z$]aV$]a#b$]a~O!X$RO!g$]a!h$]a~P@^Oy$[a!Q$[a!i$[a!j$[a!k$[a$^$[ao$[a$R$[aU$[a#a$[aZ$[a!Z$[aV$[a#b$[a~O!d$TO!e$TO!f$TO!g$[a!h$[a~PArO!Q$Za!i$Za!j$Za!k$Za$^$Zao$Za$R$ZaU$Za#a$ZaZ$Za!Z$ZaV$Za#b$Za~Oy$VO!g$Za!h$Za~PCTO!i$ZO!Q$Wa!j$Wa!k$Wa$^$Wao$Wa$R$WaU$Wa#a$WaZ$Wa!Z$WaV$Wa#b$Wa~O!j$]O!Q$Va!k$Va$^$Vao$Va$R$VaU$Va#a$VaZ$Va!Z$VaV$Va#b$Va~O!k$_O!Q$Ua$^$Uao$Ua$R$UaU$Ua#a$UaZ$Ua!Z$UaV$Ua#b$Ua~O$S%uO~O$T%vO~Oo!aiy!ai!Q!ai!X!ai!d!ai!e!ai!f!ai!i!ai!j!ai!k!ai$^!ai$R!aiU!ai#a!aiZ!ai!Z!aiV!ai#b!ai~OnrO!bsO!l!ai!W!ai~PF}O$R%zO~O$a$iO$R!va~O^%}Om&OO~OS#eO!z&SO~OS&TO~OS&UO~OU&VO~O!Z&WO~O!l&XO~OU&ZO~OV#iO#XlO~O#a&]O~OZ&_O$^tO~O!Q&cO$R&aO~OZ&dO~O!Q&fO$R&aO~Oo&iOy%WO~OnrO!bsO!W!ca~P>ZOS#sOV!fO_!eOn!]O}!_O!P#tO!R!_O!Y!_O![!^O$`(kO~On(rO!b(jO!g!aa!h!aa~P7mOU&mO$^#zO~On&nO$Tka!Qka$Rka$akaVka~O$T%vO!Qai$^aioai$RaiUai#aaiZai!ZaiVai#bai~OZ&qO!Q&pO~O$^&rO~O_&sO~O_&tO~O!Q&uO~O$^&vO~OZ&vO!Q&wO~O!Q&xO~O!Q&yO~O!l&zO~OU&|O~OZ'OO$^tO~O!r'SO!s'SO~P5eOS%QO~O!Q'VO$R&aO~O!Q'YO$R&aO~OZ'ZO~O!Z'[O~On(rO!b(jO!g!ai!h!ai~PF}OS'`O~On'eO$R]q$a]q!l]q~OS'gO~O$R'hO~OV#iO#b'jO~O$a$iO!Q!pX$R!pXV!pX~OV'nO~OZ'pO~O!X(nO~P,{O!d(oO!e(oO!f(oO~P.aOy(pO~P/rOo'uO~O!Q'vO~O!Q'wO~O$^'xO~O!Q'yO~OS'zO~O!Q'{O~O$a$iO!Q!pa$R!paV!pa~OS]O#g#QP~P$QO!X(nO~P@^O!d(oO!e(oO!f(oO~PArOy(pO~PCTO!Q(UO$^(SO~Oo(UO~O#g(YO~O!Q([O~OS(]O~O!Q(_O$^(SO~OU(aO~O!Q(dO$^(SO~O!l(eO~OU(fO~O$R(gO~O!Q(hO$^(SO~OS%`O~OS%ZO~Oo&lO~Oy(lOz(lO~PKXO!g(qO~P0zO#}P#|S!d~",
  goto: "BW$^PP$_PPPPP$b$ePP$i$lPP$s&kP'Z'^PPP'^PP'oPPPP&k'y(l)`*T*y+s,o-mPP.m/tP0uPPP0u1vP1|PPPPP0uP0u2U3eP/tPPPPPPPPP3yP4P4Y4iPP4p5Y5i5o5oPP5oP5oPP5s6`6n6nP6|7[P7mP7sP7sPPPP3yP8R8[P8b8h8n8t8z9U9`9j9t9z:Q:W:b:l:w;R;];xPPPPPPPPPP<Y<x=i>Z>|?p@fA^RSPRYTT^X_R$z#gS#Sv#QR$y#gQ!bqQ!|rQ#`wQ#h!VQ#v!^Q$O!eQ$P!fQ$u#aQ%P#lQ%a#zQ%x$eQ%|$lQ&P$nQ&Q$oQ&R$pQ&k%]Q&{&XQ&}&]Q'a&qQ'b&rQ'c&sQ'd&tQ'f&vQ'|'jQ(R'xQ(b(YQ(i(eR(m(r!Z!yqrw!V!^!e!f#a#l#z$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rR$d!zS#Sv#QQ$a!zQ$y#gZ'Q&_&d'O'Z'pQ$a!zZ'Q&_&d'O'Z'p!Y!wqrw!V!^!e!f#a#l#z$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rR%s$_![!uqrw!V!^!e!f#a#l#z$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rR%q$]!^!sqrw!V!^!e!f#a#l#z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rR%o$Z!`!qqrw!V!^!e!f#a#l#z$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rR%n$Y!`!oqrw!V!^!e!f#a#l#z$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rS%m$X(qR(s$Y!d!mqrw!V!^!e!f#a#l#z$X$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rS%k$V(pR'_(q!f!kqrw!V!^!e!f#a#l#z$V$X$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rS%i$T(oT'^(p(q!h!iqrw!V!^!e!f#a#l#z$T$V$X$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(rS%g$R(nV'](o(p(q!r!gqrw!V!^!e!f#a#l#z$R$T$V$X$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(n(o(p(q(rS#q!]%WS$Q!h(lR&j%[!}!dqrw!V!]!^!e!f!h#a#l#z$R$T$V$X$Y$Z$]$_$e$l$n$o$p%W%[%]&X&]&q&r&s&t&v'j'x(Y(e(l(n(o(p(q(r!}!_qrw!V!]!^!e!f!h#a#l#z$R$T$V$X$Y$Z$]$_$e$l$n$o$p%W%[%]&X&]&q&r&s&t&v'j'x(Y(e(l(n(o(p(q(rQ#r!]R&g%WS#o!]%WT%V#p#qhcX_agiz{#c#i$|'n'}!}!dqrw!V!]!^!e!f!h#a#l#z$R$T$V$X$Y$Z$]$_$e$l$n$o$p%W%[%]&X&]&q&r&s&t&v'j'x(Y(e(l(n(o(p(q(rSx]!QS#y!`#sS$g!}%`S%d#}%ZT%y$f&lXhX_i{Q%S#mQ%U#nR'T&aQ'R&_Q'X&dQ'k'OQ'q'ZR(P'pZ'P&_&d'O'Z'pQ#j!WQ#k!XQ&[%OQ&`%RQ'W&cQ'i&}Q'm'VR(V'|k`X_aiz{#]#c#i$q$|'n'}Q#TvR$h#QT#Rv#QQjXU|_aiS#bz{Q$w#cQ$}#iQ&Y$|Q(O'nR(W'}ieX_agiz{#c#i$|'n'}icX_agiz{#c#i$|'n'}ifX_agiz{#c#i$|'n'}hdX_agiz{#c#i$|'n'}R&[%OQ!WlR!XmidX_agiz{#c#i$|'n'}Q'o'XQ(Q'qR(Z(PQ(X(OR(`(WQVRRZVQ_XRy_Q%w$dR&o%wQ%X#rR&h%XQ#{!bS%b#{%fR%f$PQ$S!iS%h$S'rR'r']Q$U!kS%j$U'sR's'^Q$W!mS%l$W'tR't'_Q$[!sR%p$[Q$^!uR%r$^Q$`!wR%t$`Q(T'yS(^(T(cR(c([QiXQ{_T!Si{Su]#eS#Pu&^R&^%QQ$j#SS%{$j'lR'l'QQ&b%SQ&e%UT'U&b&eQaXSz_i[}az#c$q$|'}Q#c{Q$q#]Q$|#iR'}'nfgX_aiz{#c#i$|'n'}R!Rg!Z!xqrw!V!^!e!f#a#l#z$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(r!]!vqrw!V!^!e!f#a#l#z$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(r!_!tqrw!V!^!e!f#a#l#z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(r!a!rqrw!V!^!e!f#a#l#z$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(r!c!pqrw!V!^!e!f#a#l#z$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(r!g!nqrw!V!^!e!f#a#l#z$X$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(q(r!k!lqrw!V!^!e!f#a#l#z$V$X$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(p(q(r!o!jqrw!V!^!e!f#a#l#z$T$V$X$Y$Z$]$_$e$l$n$o$p%]&X&]&q&r&s&t&v'j'x(Y(e(o(p(q(r",
  nodeNames: "\u26A0 LineComment BlockComment Program Identifier program } { ProgramBlock ConstDecl const : ConstType ExprComplexAlgebraicType PrimitiveType ( Expression CreationExpression new ArrayType PrimitiveType PrimitiveType PrimitiveType PrimitiveType AlgebraicType PrimitiveType PrimitiveType ComplexAlgebraicType PrimitiveType PrimitiveType [ ] CondXorExpr CondOrExpr CondAndExpr EqualExpr RelExpr AddExpr MulExpr PowExpr UnaryExpr ArithOp LogicOp PrimaryExpression Literal BooleanLiteral Random Random ) NumberLiteral Polynomial PolynomialTerm ArithOp XTerm x ArithOp StringLiteral >> << ECPoint PAI ECRandom ProcFuncCall Selector . ArrayLen ArithOp ArithOp ArithOp CompareOp CompareOp LogicOp LogicOp LogicOp AssignOp Procedure procedure FormalParam ParamType RandomGeneratorType PrimitiveType PrimitiveType Block Decl DeclType ExprRandomGeneratorType ContainerType PrimitiveType PrimitiveType SameAs PrimitiveType ECBaseField PrimitiveType PrimitiveType StatementList Statement Assignment ECAssignment break BlockStatement IfStatement if Condition else WhileStatement while ForStatement for Equals to step Function function FuncBlock ReturnStatement return",
  maxTerm: 155,
  nodeProps: [
    ["openedBy", 6, "{", 31, "[", 48, "(", 57, "<<"],
    ["closedBy", 7, "}", 15, ")", 30, "]", 58, ">>"]
  ],
  propSources: [highlight],
  skippedNodes: [0, 1, 2, 116],
  repeatNodeCount: 18,
  tokenData: ",j~RnXY#PYZ#P]^#Ppq#Pqr#brs#ost%hxy%myz%zz{&P{|&U|}&Z}!O&`!O!P&g!P!Q&l!Q!R'e!R![(X![!](a!]!^(n!^!_(s!_!`)Y!`!a)b!c!})r!}#O*T#P#Q,U#Q#R,Z#R#S)r#T#o)r#o#p,`#q#r,e~#US#|~XY#PYZ#P]^#Ppq#P^#gPzQ!_!`#j[#oO!h[~#rVOr#ors$Xs#O#o#O#P$^#P;'S#o;'S;=`%b<%lO#o~$^O!Y~~$aVOr#ors$vs#O#o#O#P$^#P;'S#o;'S;=`%b<%lO#o~${V!Y~Or#ors$Xs#O#o#O#P$^#P;'S#o;'S;=`%b<%lO#o~%eP;=`<%l#o~%mO$`~n%rP_^yz%u`%zO$S`~&PO!Q~~&UO!e~Y&ZOyY~&`O$^~^&gOyY!US~&lO!b~~&qQ!d~z{&w!P!Q&|~&|O#}~~'RSP~OY&|Z;'S&|;'S;=`'_<%lO&|~'bP;=`<%l&|~'jP!R~#l#m'm~'pR!Q!['y!c!i'y#T#Z'y~(OR!R~!Q!['y!c!i'y#T#Z'y~(^P!R~!Q![(X~(fPZ~!_!`(i~(nO!l~~(sO$R~^(xQ!gW!^!_)O!_!`)TU)TO![UW)YO!gW^)_P#`Q!_!`#j~)gQ!gW!_!`)T!`!a)m~)rO!Z~~)wSS~!Q![)r!c!})r#R#S)r#T#o)r~*YQn~pq*`#P#Q,P~*cP!g!h*f~*iP#l#m*l~*oP#d#e*r~*uP#f#g*x~*{P#X#Y+O~+RP#g#h+U~+XP#g#h+[~+_P#]#^+b~+eP#c#d+h~+kP#b#c+n~+qPpq+t~+wP#P#Q+z~,PO$T~~,UO$a~~,ZOo~~,`O!X~~,eOV~~,jOU~",
  tokenizers: [1, 2, 3, 4, new LocalTokenGroup("j~RQYZXz{^~^O$P~~aP!P!Qd~iO$Q~~", 25, 138)],
  topRules: { "Program": [0, 3] },
  specialized: [{ term: 4, get: (value) => spec_Identifier[value] || -1 }],
  tokenPrec: 2456
});

// src/ffapl.js
var FFaplLanguage = LRLanguage.define({
  name: "FFapl",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Block: delimitedIndent({ closing: "}" }),
        FuncBlock: delimitedIndent({ closing: "}" }),
        ProgramBlock: delimitedIndent({ closing: "}" }),
        ConstDecl: continuedIndent({ except: /^{/ }),
        Decl: continuedIndent({ except: /^{/ }),
        Statement: continuedIndent({ except: /^{/ })
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", '"'] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:.*\{|\})$/,
    wordChars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  }
});
function FFapl() {
  return new LanguageSupport(FFaplLanguage, []);
}
export {
  FFapl,
  FFaplLanguage
};
