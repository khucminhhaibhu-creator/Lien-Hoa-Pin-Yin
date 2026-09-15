(()=>{
const input=document.querySelector('#inp');
if(!input||document.querySelector('#lhPinyinKeyboard')) return;
const wrap=document.createElement('div');
wrap.id='lhPinyinKeyboard';
wrap.className='card';
wrap.innerHTML=`<div class="label">BÀN PHÍM PINYIN • GÕ TRỰC TIẾP</div>
<div class="lhpk-note">Bấm chữ cái để nhập Pinyin • 1–4 để thêm thanh • 5 = thanh nhẹ • ü dùng phím Ü</div>
<div class="lhpk-row">${'qwertyuiop'.split('').map(x=>`<button data-k="${x}">${x}</button>`).join('')}</div>
<div class="lhpk-row">${'asdfghjkl'.split('').map(x=>`<button data-k="${x}">${x}</button>`).join('')}</div>
<div class="lhpk-row">${'zxcvbnm'.split('').map(x=>`<button data-k="${x}">${x}</button>`).join('')}</div>
<div class="lhpk-row lhpk-tools"><button data-k="ü">ü</button><button data-tone="1">ā á 1</button><button data-tone="2">á 2</button><button data-tone="3">ǎ 3</button><button data-tone="4">à 4</button><button data-tone="5">a 5</button><button data-space="1">SPACE</button><button data-back="1">⌫</button></div>`;
const style=document.createElement('style');
style.textContent=`#lhPinyinKeyboard{margin-top:14px}#lhPinyinKeyboard .lhpk-note{font-size:12px;color:#777;margin:-2px 0 10px}.lhpk-row{display:grid;grid-template-columns:repeat(10,1fr);gap:6px;margin:6px 0}.lhpk-row button{border:1px solid #e4d9ca;border-radius:10px;background:#f7f2eb;padding:12px 5px;font-weight:850;cursor:pointer;min-height:44px}.lhpk-row button:hover{background:#eadfce;transform:translateY(-1px)}.lhpk-tools{grid-template-columns:repeat(8,1fr)}.lhpk-tools button{color:#333}.lhpk-tools button[data-tone]{color:#a70f19;background:#fff0f0}.lhpk-tools button[data-k="ü"]{font-size:20px}@media(max-width:650px){.lhpk-row{grid-template-columns:repeat(10,1fr);gap:4px}.lhpk-row button{padding:10px 2px;font-size:14px}.lhpk-tools{grid-template-columns:repeat(4,1fr)}}`;
document.head.appendChild(style);
input.parentElement.insertAdjacentElement('afterend',wrap);
function fire(){input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()}
function insert(text){let s=input.selectionStart??input.value.length,e=input.selectionEnd??s;input.value=input.value.slice(0,s)+text+input.value.slice(e);input.selectionStart=input.selectionEnd=s+text.length;fire()}
function toneLast(n){let s=input.value;let m=s.match(/([A-Za-züÜvV]+)(?:[1-5])?\s*$/);if(!m){return}let start=s.length-m[0].length;let syl=m[1];s=s.slice(0,start)+syl+n+' ';input.value=s;input.selectionStart=input.selectionEnd=s.length;fire()}
wrap.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k)insert(b.dataset.k);else if(b.dataset.tone)toneLast(b.dataset.tone);else if(b.dataset.space)insert(' ');else if(b.dataset.back){let s=input.value,e=input.selectionEnd??s.length,st=input.selectionStart??e;if(st===e&&e>0){input.value=s.slice(0,e-1)+s.slice(e);input.selectionStart=input.selectionEnd=e-1}else{input.value=s.slice(0,st)+s.slice(e);input.selectionStart=input.selectionEnd=st}fire()}});
})();
