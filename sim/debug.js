'use strict';
// Quick debug: simulate 10k expeditions to check success rates
const SKILLS=['I','C','G'];
function rng(seed){
  let s=seed>>>0;
  return ()=>{s=(Math.imul(1664525,s)+1013904223)>>>0;return s/0x100000000;};
}
function shuffle(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

// Bag for 1-researcher expedition: base 2/2/2 + spike I:3 C:1 G:1
const BAG = ['I','I','C','C','G','G', 'I','I','I','C','G']; // 5I+3C+3G=11

const reqBase=0.8, reqStep=0.4;
const stab=2;
let cos=0,cl2=0,cl1=0,cl0=0,ocs=0;
const N=50000;

for(let g=0;g<N;g++){
  const r=rng(g*7+13);
  const sh=shuffle(BAG,r);
  let hand=sh.slice(0,4), rem=sh.slice(4);
  let cl=0, inst=0;
  // 2-step card: req per step
  const reqs=[Math.max(1,Math.round(reqBase)),Math.max(1,Math.round(reqBase+reqStep))];
  let cashout=false;

  for(let si=0;si<2;si++){
    const skill=SKILLS[Math.floor(r()*3)];
    const req=reqs[si];
    let have=hand.filter(c=>c===skill).length;

    // Try overclock if needed (only if won't trigger shutdown)
    while(have<req && inst+1<stab && rem.length>0){
      inst++;ocs++;
      const d=rem.splice(0,1)[0];
      hand.push(d);
      if(d===skill)have++;
    }

    if(have>=req){
      cl++;
      let n=req;
      hand=hand.filter(c=>{if(n>0&&c===skill){n--;return false;}return true;});
    } else {
      cashout=true;break;
    }
  }
  if(cl===0)cl0++;else if(cl===1)cl1++;else cl2++;
  if(cashout||cl<2)cos++;
}

console.log(`N=${N}`);
console.log(`Cleared 0: ${cl0} (${(cl0/N*100).toFixed(1)}%)`);
console.log(`Cleared 1: ${cl1} (${(cl1/N*100).toFixed(1)}%) ← found find step, cashed out before obj`);
console.log(`Cleared 2: ${cl2} (${(cl2/N*100).toFixed(1)}%) ← reached objective`);
console.log(`Cash-out rate: ${(cos/N*100).toFixed(1)}%`);
console.log(`Avg OC/expedition: ${(ocs/N).toFixed(2)}`);
