(()=>{
const input=document.querySelector('#inp');
if(!input||document.querySelector('#lhPinyinKeyboard')) return;
const wrap=document.createElement('div');
wrap.id='lhPinyinKeyboard';
wrap.className='card';
wrap.innerHTML=`<div class="label">BÀN PHÍM PINYIN • BỘ GÕ TIẾNG TRUNG</div>
<div class="lhpk-note">Bố cục theo <b>Thanh mẫu + Vận mẫu + Thanh điệu</b>, không phải bàn phím QWERTY. Chọn âm → thêm thanh → SPACE để sang âm tiết mới.</div>
<div class="lhpk-title">Thanh mẫu</div>
<div class="lhpk-row initials">${['b','p','m','f','d','t','n','l','g','k','h','j','q','x','zh','ch','sh','r','z','c','s'].map(x=>`<button data-k="${x}">${x}</button>`).join('')}</div>
<div class="lhpk-title">Vận mẫu</div>
<div class="lhpk-row finals">${['a','o','e','i','u','ü','ai','ei','ao','ou','an','en','ang','eng','ong','ia','ie','iao','iu','ian','in','iang','ing','iong','ua','uo','uai','ui','uan','un','uang','ueng','üe','üan','ün','er'].map(x=>`<button data-k="${x}">${x}</button>`).join('')}</div>
<div class="lhpk-title">Thanh điệu & thao tác</div>
<div class="lhpk-row tones"><button data-tone="1">ˉ 1</button><button data-tone="2">ˊ 2</button><button data-tone="3">ˇ 3</button><button data-tone="4">ˋ 4</button><button data-tone="5">˙ 5</button><button data-space="1">SPACE</button><button data-back="1">⌫</button><button data-clear="1">XÓA</button></div>`;
const style=document.createElement('style');
style.textContent=`#lhPinyinKeyboard{margin-top:14px}#lhPinyinKeyboard .lhpk-note{font-size:12px;color:#777;line-height:1.5;margin:-2px 0 12px}.lhpk-title{font-size:12px;font-weight:900;color:#7d0911;margin:9px 0 5px}.lhpk-row{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0}.lhpk-row button{border:1px solid #e4d9ca;border-radius:10px;background:#f7f2eb;padding:10px 11px;font-weight:850;cursor:pointer;min-width:46px;min-height:42px}.lhpk-row button:hover{background:#eadfce;transform:translateY(-1px)}.lhpk-row.initials button{min-width:48px}.lhpk-row.finals button{min-width:52px}.lhpk-row.tones button{flex:1;min-width:75px}.lhpk-row.tones button[data-tone]{color:#a70f19;background:#fff0f0;font-size:16px}.lhpk-row.tones button[data-space]{background:#f0e7d8}.lhpk-row.tones button[data-clear]{background:#a70f19;color:#fff}@media(max-width:650px){.lhpk-row{gap:4px}.lhpk-row button{padding:9px 8px;min-width:43px;min-height:40px;font-size:14px}.lhpk-row.finals button{min-width:48px}.lhpk-row.tones button{min-width:70px}}`;
document.head.appendChild(style);
input.parentElement.insertAdjacentElement('afterend',wrap);
function fire(){input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()}
function insert(text){let s=input.value,e=input.selectionEnd??s.length,st=input.selectionStart??e;input.value=s.slice(0,st)+text+s.slice(e);input.selectionStart=input.selectionEnd=st+text.length;fire()}
function toneLast(n){let s=input.value.trimEnd();let m=s.match(/([A-Za-züÜvV]+)(?:[1-5])?$/);if(!m)return;let start=s.length-m[0].length;s=s.slice(0,start)+m[1]+n+' ';input.value=s;input.selectionStart=input.selectionEnd=s.length;fire()}
function back(){let s=input.value,e=input.selectionEnd??s.length,st=input.selectionStart??e;if(st===e&&e>0){input.value=s.slice(0,e-1)+s.slice(e);input.selectionStart=input.selectionEnd=e-1}else{input.value=s.slice(0,st)+s.slice(e);input.selectionStart=input.selectionEnd=st}fire()}
wrap.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k)insert(b.dataset.k);else if(b.dataset.tone)toneLast(b.dataset.tone);else if(b.dataset.space)insert(' ');else if(b.dataset.back)back();else if(b.dataset.clear){input.value='';fire()}});
})();
