'use client'

import React from 'react'

// ─── Colour constants ────────────────────────────────────────────────────────
const BODY      = 'rgba(31,27,22,0.16)'
const BODY_LINE = 'rgba(31,27,22,0.50)'
const HAIR      = 'rgba(31,27,22,0.42)'
const EQUIP     = '#1F1B16'
const EQUIP_SOFT= '#4A413A'
const FLOOR_C   = 'rgba(31,27,22,0.22)'

// ─── Primitives ──────────────────────────────────────────────────────────────

function Limb({ from, to, w = 16 }: { from:[number,number]; to:[number,number]; w?:number }) {
  const [x1,y1]=from,[x2,y2]=to
  const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI
  return (
    <g transform={`translate(${x1} ${y1}) rotate(${ang})`}>
      <rect x={-w*0.35} y={-w/2} width={len+w*0.7} height={w}
        rx={w/2} ry={w/2} fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" />
    </g>
  )
}

function Torso({ shL,shR,hipL,hipR }:{shL:[number,number];shR:[number,number];hipL:[number,number];hipR:[number,number]}) {
  return (
    <path d={`M ${shL[0]} ${shL[1]} L ${shR[0]} ${shR[1]} L ${hipR[0]} ${hipR[1]} L ${hipL[0]} ${hipL[1]} Z`}
      fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" strokeLinejoin="round" />
  )
}

function Head({ cx,cy,r=12,tilt=0 }:{cx:number;cy:number;r?:number;tilt?:number}) {
  return (
    <g transform={`rotate(${tilt} ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r={r} fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" />
      <path d={`M ${cx-r*0.85} ${cy-r*0.45} Q ${cx} ${cy-r*1.4} ${cx+r*0.85} ${cy-r*0.45} L ${cx+r*0.55} ${cy-r*0.15} Q ${cx} ${cy-r*0.7} ${cx-r*0.55} ${cy-r*0.15} Z`}
        fill={HAIR} />
    </g>
  )
}

function Floor({ y=250 }:{y?:number}) {
  return (
    <g>
      <line x1="6" y1={y} x2="314" y2={y} stroke={FLOOR_C} strokeWidth="1.4" />
      <line x1="6" y1={y+3.5} x2="314" y2={y+3.5} stroke={FLOOR_C} strokeWidth="0.6" strokeDasharray="3 3" />
    </g>
  )
}

function Shadow({ cx,cy=248,rx=30,ry=3.5 }:{cx:number;cy?:number;rx?:number;ry?:number}) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(31,27,22,0.10)" />
}

function Glow({ cx,cy,rx,ry,color,rotate=0,opacity=0.7 }:{cx:number;cy:number;rx:number;ry:number;color:string;rotate?:number;opacity?:number}) {
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`} style={{ mixBlendMode:'multiply' }}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity*0.8} />
      <ellipse cx={cx} cy={cy} rx={rx*0.55} ry={ry*0.55} fill={color} opacity={opacity} />
    </g>
  )
}

function MotionArrow({ d,color,dashed=true,fid }:{d:string;color:string;dashed?:boolean;fid:string}) {
  return (
    <path d={d} stroke={color} strokeWidth="1.7" fill="none"
      strokeDasharray={dashed?'5 3':'none'} strokeLinecap="round"
      markerEnd={`url(#mh-${fid})`} />
  )
}

function PoseLabel({ x,y,text }:{x:number;y:number;text:string}) {
  return (
    <text x={x} y={y} textAnchor="middle" fontFamily="JetBrains Mono, monospace"
      fontSize="9" letterSpacing="0.18em" fill="rgba(31,27,22,0.55)" fontWeight="600">
      {text}
    </text>
  )
}

function HandLabel({ x,y,text,color,anchor='middle',rot=-3 }:{x:number;y:number;text:string;color:string;anchor?:'start'|'middle'|'end';rot?:number}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily="Caveat, cursive"
      fontSize="17" fill={color} transform={`rotate(${rot} ${x} ${y})`}>
      {text}
    </text>
  )
}

// ─── Equipment ───────────────────────────────────────────────────────────────

function Dumbbell({ cx,cy,size=1,angle=0 }:{cx:number;cy:number;size?:number;angle?:number}) {
  const handle=14*size,headW=9*size,headH=14*size
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
      <rect x={-handle/2} y="-2.2" width={handle} height="4.4" rx="1" fill={EQUIP} />
      <rect x={-handle/2-headW} y={-headH/2} width={headW} height={headH} rx="2.5" fill={EQUIP} />
      <rect x={handle/2} y={-headH/2} width={headW} height={headH} rx="2.5" fill={EQUIP} />
    </g>
  )
}

function Barbell({ cx,cy,length=130,angle=0,plates=2 }:{cx:number;cy:number;length?:number;angle?:number;plates?:number}) {
  const sleeve=12,plateR=15
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
      <rect x={-length/2} y="-2" width={length} height="4" rx="1.5" fill={EQUIP} />
      <rect x={-length/2-sleeve} y="-3" width={sleeve} height="6" fill={EQUIP} />
      <rect x={length/2} y="-3" width={sleeve} height="6" fill={EQUIP} />
      {Array.from({length:plates}).map((_,i)=>(
        <g key={i}>
          <circle cx={-length/2-sleeve-5-i*7} cy="0" r={plateR-i*2.5} fill={EQUIP} />
          <circle cx={ length/2+sleeve+5+i*7} cy="0" r={plateR-i*2.5} fill={EQUIP} />
          <circle cx={-length/2-sleeve-5-i*7} cy="0" r={(plateR-i*2.5)-1.5} fill="none" stroke="#FAF7F1" strokeWidth="0.6" opacity="0.4" />
          <circle cx={ length/2+sleeve+5+i*7} cy="0" r={(plateR-i*2.5)-1.5} fill="none" stroke="#FAF7F1" strokeWidth="0.6" opacity="0.4" />
        </g>
      ))}
    </g>
  )
}

function Bench({ x,y,w=100 }:{x:number;y:number;w?:number}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="11" rx="2" fill={EQUIP_SOFT} />
      <rect x={x+3} y={y+11} width="5" height="26" fill={EQUIP_SOFT} />
      <rect x={x+w-8} y={y+11} width="5" height="26" fill={EQUIP_SOFT} />
    </g>
  )
}

function CableTower({ x,y=30,h=200,pulleyY }:{x:number;y?:number;h?:number;pulleyY:number}) {
  return (
    <g>
      <rect x={x-4} y={y} width="9" height={h} fill={EQUIP_SOFT} />
      <circle cx={x} cy={pulleyY} r="7" fill={EQUIP} />
      <circle cx={x} cy={pulleyY} r="2.5" fill="#FAF7F1" />
    </g>
  )
}

function CableLine({ from,to,color=EQUIP_SOFT }:{from:[number,number];to:[number,number];color?:string}) {
  return <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth="1.4" />
}

function RopeHandle({ cx,cy,angle=0 }:{cx:number;cy:number;angle?:number}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
      <line x1="-10" y1="0" x2="10" y2="0" stroke={EQUIP} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="-12" cy="0" r="2.5" fill={EQUIP} />
      <circle cx="12" cy="0" r="2.5" fill={EQUIP} />
    </g>
  )
}

function PullupBar({ x1,x2,y }:{x1:number;x2:number;y:number}) {
  return (
    <g>
      <rect x={x1-5} y="0" width="7" height={y-4} fill={EQUIP_SOFT} />
      <rect x={x2-2} y="0" width="7" height={y-4} fill={EQUIP_SOFT} />
      <rect x={x1} y={y-4} width={x2-x1} height="5" rx="2" fill={EQUIP} />
    </g>
  )
}

function AbWheel({ cx,cy,angle=0 }:{cx:number;cy:number;angle?:number}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
      <line x1="-14" y1="0" x2="14" y2="0" stroke={EQUIP} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="0" cy="3" r="9" fill={EQUIP} />
      <circle cx="0" cy="3" r="3" fill="#FAF7F1" />
    </g>
  )
}

// ─── SVG wrapper ─────────────────────────────────────────────────────────────

function FigureFrame({ children,color,fid }:{children:React.ReactNode;color:string;fid:string}) {
  return (
    <svg viewBox="0 0 320 290" width="100%"
      style={{ maxWidth:380,display:'block',margin:'0 auto' }}>
      <defs>
        <marker id={`mh-${fid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={color} />
        </marker>
        <marker id={`mh2-${fid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={color} />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

// ─── Arm config helper ────────────────────────────────────────────────────────

type ArmNodes = { shL:[number,number]; shR:[number,number]; elbowL:[number,number]; elbowR:[number,number]; wristL:[number,number]; wristR:[number,number] }

function Arms({ shL,shR,elbowL,elbowR,wristL,wristR,w=12 }:ArmNodes&{w?:number}) {
  return (
    <g>
      <Limb from={shL} to={elbowL} w={w} />
      <Limb from={elbowL} to={wristL} w={w-1} />
      <Limb from={shR} to={elbowR} w={w} />
      <Limb from={elbowR} to={wristR} w={w-1} />
    </g>
  )
}

// ─── Pose builders ────────────────────────────────────────────────────────────

function StandingTall({ cx,floorY=250,armPose='down',height=150 }:{cx:number;floorY?:number;armPose?:string;height?:number}) {
  const headR=12,top=floorY-height,headC:[number,number]=[cx,top+headR+2]
  const sh=top+30,hip=top+90,knee=top+122,ankle=floorY-4
  const shL:[number,number]=[cx-14,sh],shR:[number,number]=[cx+14,sh]
  const hipL:[number,number]=[cx-11,hip],hipR:[number,number]=[cx+11,hip]
  let n:ArmNodes
  if(armPose==='goblet')         n={shL,shR,elbowL:[cx-16,sh+22],elbowR:[cx+16,sh+22],wristL:[cx-5,sh+18],wristR:[cx+5,sh+18]}
  else if(armPose==='curl-bottom') n={shL,shR,elbowL:[cx-15,sh+30],elbowR:[cx+15,sh+30],wristL:[cx-17,sh+58],wristR:[cx+17,sh+58]}
  else if(armPose==='curl-top')    n={shL,shR,elbowL:[cx-14,sh+32],elbowR:[cx+14,sh+32],wristL:[cx-8,sh+12],wristR:[cx+8,sh+12]}
  else if(armPose==='lateral-down')n={shL,shR,elbowL:[cx-18,sh+26],elbowR:[cx+18,sh+26],wristL:[cx-18,sh+54],wristR:[cx+18,sh+54]}
  else if(armPose==='lateral-up')  n={shL,shR,elbowL:[cx-42,sh+2], elbowR:[cx+42,sh+2], wristL:[cx-64,sh-2],wristR:[cx+64,sh-2]}
  else if(armPose==='overhead')    n={shL,shR,elbowL:[cx-16,sh-28],elbowR:[cx+16,sh-28],wristL:[cx-10,sh-56],wristR:[cx+10,sh-56]}
  else if(armPose==='overhead-bent')n={shL,shR,elbowL:[cx-14,sh-30],elbowR:[cx+14,sh-30],wristL:[cx-20,sh+4],wristR:[cx+20,sh+4]}
  else if(armPose==='pushdown-top') n={shL,shR,elbowL:[cx-12,sh+28],elbowR:[cx+12,sh+28],wristL:[cx-18,sh+6],wristR:[cx+18,sh+6]}
  else if(armPose==='pushdown-bottom')n={shL,shR,elbowL:[cx-14,sh+30],elbowR:[cx+14,sh+30],wristL:[cx-14,sh+58],wristR:[cx+14,sh+58]}
  else if(armPose==='face-pull')   n={shL,shR,elbowL:[cx-38,sh-4],elbowR:[cx+38,sh-4],wristL:[cx-8,sh-16],wristR:[cx+8,sh-16]}
  else if(armPose==='cable-fly-open')  n={shL,shR,elbowL:[cx-36,sh+4],elbowR:[cx+36,sh+4],wristL:[cx-62,sh+8],wristR:[cx+62,sh+8]}
  else if(armPose==='cable-fly-closed')n={shL,shR,elbowL:[cx-20,sh+8],elbowR:[cx+20,sh+8],wristL:[cx-4,sh+14],wristR:[cx+4,sh+14]}
  else n={shL,shR,elbowL:[cx-17,sh+28],elbowR:[cx+17,sh+28],wristL:[cx-16,sh+56],wristR:[cx+16,sh+56]}
  return (
    <g>
      <Shadow cx={cx} cy={floorY-2} />
      <Limb from={[cx-7,hip]} to={[cx-7,knee]} w={18} />
      <Limb from={[cx-7,knee]} to={[cx-5,ankle]} w={16} />
      <Limb from={[cx+7,hip]} to={[cx+7,knee]} w={18} />
      <Limb from={[cx+7,knee]} to={[cx+5,ankle]} w={16} />
      <Torso shL={shL} shR={shR} hipL={hipL} hipR={hipR} />
      <Arms {...n} />
      <Head cx={headC[0]} cy={headC[1]} r={headR} />
    </g>
  )
}

function SquatBottom({ cx,floorY=250,armPose='goblet' }:{cx:number;floorY?:number;armPose?:string}) {
  const headR=12,top=floorY-132,headC:[number,number]=[cx,top+headR+2]
  const sh=top+30,hip=top+80,kneeY=floorY-28,kneeOffset=22
  const shL:[number,number]=[cx-13,sh],shR:[number,number]=[cx+13,sh]
  const hipL:[number,number]=[cx-16,hip],hipR:[number,number]=[cx+16,hip]
  let n:ArmNodes
  if(armPose==='goblet') n={shL,shR,elbowL:[cx-18,sh+18],elbowR:[cx+18,sh+18],wristL:[cx-5,sh+16],wristR:[cx+5,sh+16]}
  else if(armPose==='barback') n={shL,shR,elbowL:[cx-22,sh-4],elbowR:[cx+22,sh-4],wristL:[cx-36,sh+12],wristR:[cx+36,sh+12]}
  else n={shL,shR,elbowL:[cx-18,sh+22],elbowR:[cx+18,sh+22],wristL:[cx-18,sh+48],wristR:[cx+18,sh+48]}
  return (
    <g>
      <Shadow cx={cx} cy={floorY-2} rx={40} />
      <Limb from={[cx-14,hip]} to={[cx-kneeOffset,kneeY]} w={19} />
      <Limb from={[cx-kneeOffset,kneeY]} to={[cx-17,floorY-4]} w={16} />
      <Limb from={[cx+14,hip]} to={[cx+kneeOffset,kneeY]} w={19} />
      <Limb from={[cx+kneeOffset,kneeY]} to={[cx+17,floorY-4]} w={16} />
      <Torso shL={shL} shR={shR} hipL={hipL} hipR={hipR} />
      <Arms {...n} />
      <Head cx={headC[0]} cy={headC[1]} r={headR} />
    </g>
  )
}

function HingePose({ cx,floorY=250,depth='mid',armPose='dbHold',faceDir=1 }:{cx:number;floorY?:number;depth?:string;armPose?:string;faceDir?:number}) {
  const headR=12
  const hip:[number,number]=[cx,floorY-90]
  const kneeY=floorY-50,ankleY=floorY-4
  const knee:[number,number]=[cx+faceDir*2,kneeY],ankle:[number,number]=[cx-faceDir*2,ankleY]
  const torsoAng=depth==='low'?65:depth==='deep'?80:50
  const rad=torsoAng*Math.PI/180,torsoLen=56
  const shCenter:[number,number]=[hip[0]+Math.sin(rad)*torsoLen*faceDir,hip[1]-Math.cos(rad)*torsoLen]
  const headC:[number,number]=[shCenter[0]+Math.sin(rad)*22*faceDir,shCenter[1]-Math.cos(rad)*22]
  const px=-Math.cos(rad)*faceDir,py=-Math.sin(rad)
  const shL:[number,number]=[shCenter[0]+px*11,shCenter[1]+py*11]
  const shR:[number,number]=[shCenter[0]-px*11,shCenter[1]-py*11]
  const hipL:[number,number]=[hip[0]-9,hip[1]],hipR:[number,number]=[hip[0]+9,hip[1]]
  let n:ArmNodes
  if(armPose==='dbHold') {
    const handY=floorY-60
    n={shL,shR,elbowL:[shCenter[0]-4*faceDir,shCenter[1]+22],elbowR:[shCenter[0]+4*faceDir,shCenter[1]+22],wristL:[shCenter[0]+2*faceDir,handY],wristR:[shCenter[0]+2*faceDir,handY]}
  } else if(armPose==='bbHold') {
    const handY=floorY-80
    n={shL,shR,elbowL:[shCenter[0],shCenter[1]+22],elbowR:[shCenter[0],shCenter[1]+22],wristL:[shCenter[0]+8*faceDir,handY],wristR:[shCenter[0]+8*faceDir,handY]}
  } else if(armPose==='ropeBetweenLegs') {
    n={shL,shR,elbowL:[shCenter[0]-8*faceDir,shCenter[1]+20],elbowR:[shCenter[0]-8*faceDir,shCenter[1]+20],wristL:[hip[0]-18*faceDir,hip[1]+8],wristR:[hip[0]-18*faceDir,hip[1]+8]}
  } else if(armPose==='rowBarbell') {
    n={shL,shR,elbowL:[shCenter[0]-20*faceDir,shCenter[1]+16],elbowR:[shCenter[0]-20*faceDir,shCenter[1]+16],wristL:[shCenter[0]-8*faceDir,shCenter[1]+28],wristR:[shCenter[0]-8*faceDir,shCenter[1]+28]}
  } else if(armPose==='flyOut') {
    n={shL,shR,elbowL:[shCenter[0]+26,shCenter[1]-6],elbowR:[shCenter[0]-26,shCenter[1]-6],wristL:[shCenter[0]+50,shCenter[1]-4],wristR:[shCenter[0]-50,shCenter[1]-4]}
  } else if(armPose==='rowOneArm') {
    n={shL,shR,elbowL:[shCenter[0]-18*faceDir,shCenter[1]+16],elbowR:[shCenter[0],floorY-80],wristL:[shCenter[0]-4*faceDir,shCenter[1]+28],wristR:[shCenter[0]+4,floorY-80]}
  } else {
    n={shL,shR,elbowL:[shCenter[0]-4,shCenter[1]+18],elbowR:[shCenter[0]+4,shCenter[1]+18],wristL:[shCenter[0],shCenter[1]+40],wristR:[shCenter[0],shCenter[1]+40]}
  }
  return (
    <g>
      <Shadow cx={cx} cy={floorY-2} rx={36} />
      <Limb from={[hip[0]-6,hip[1]]} to={[knee[0]-4,knee[1]]} w={18} />
      <Limb from={[knee[0]-4,knee[1]]} to={[ankle[0]-2,ankle[1]]} w={16} />
      <Limb from={[hip[0]+6,hip[1]]} to={[knee[0]+4,knee[1]]} w={18} />
      <Limb from={[knee[0]+4,knee[1]]} to={[ankle[0]+2,ankle[1]]} w={16} />
      <Torso shL={shL} shR={shR} hipL={hipL} hipR={hipR} />
      <Arms {...n} />
      <Head cx={headC[0]} cy={headC[1]} r={headR} />
    </g>
  )
}

function SupineBench({ cx,benchY=200,armPose='benchBottom' }:{cx:number;benchY?:number;armPose?:string}) {
  const head:[number,number]=[cx-56,benchY-6]
  const sh:[number,number]=[cx-38,benchY-8],hip:[number,number]=[cx+26,benchY-8]
  const knee:[number,number]=[cx+60,benchY-5],ankle:[number,number]=[cx+90,benchY+22]
  return (
    <g>
      <Torso shL={[sh[0],benchY-16]} shR={[sh[0]+4,benchY-16]} hipL={[hip[0],benchY-14]} hipR={[hip[0]+4,benchY-14]} />
      <rect x={sh[0]} y={benchY-22} width={hip[0]-sh[0]} height="14" rx="7" fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" />
      <Limb from={hip} to={[knee[0],benchY-20]} w={17} />
      <Limb from={[knee[0],benchY-20]} to={ankle} w={15} />
      {armPose==='benchBottom' && <>
        <Limb from={[sh[0]-2,benchY-16]} to={[sh[0]+4,benchY-44]} w={12} />
        <Limb from={[sh[0]+4,benchY-44]} to={[sh[0]+18,benchY-38]} w={11} />
        <Limb from={[sh[0]-2,benchY-12]} to={[sh[0]+4,benchY-40]} w={12} />
        <Limb from={[sh[0]+4,benchY-40]} to={[sh[0]+18,benchY-34]} w={11} />
      </>}
      {armPose==='benchTop' && <>
        <Limb from={[sh[0]-2,benchY-16]} to={[sh[0]+4,benchY-62]} w={12} />
        <Limb from={[sh[0]+4,benchY-62]} to={[sh[0]+16,benchY-84]} w={11} />
        <Limb from={[sh[0]-2,benchY-12]} to={[sh[0]+4,benchY-58]} w={12} />
        <Limb from={[sh[0]+4,benchY-58]} to={[sh[0]+16,benchY-80]} w={11} />
      </>}
      <Head cx={head[0]} cy={head[1]} r={12} tilt={-90} />
    </g>
  )
}

function HipBridge({ cx,benchY=210,bridged=true }:{cx:number;benchY?:number;bridged?:boolean}) {
  const shX=cx-70,hipX=cx+10,kneeX=cx+55,ankleX=cx+55,ankleY=248
  const hipY=bridged?benchY-28:benchY+8,shY=benchY-6
  const kneeY=bridged?benchY-24:benchY+10
  return (
    <g>
      <Head cx={shX-18} cy={shY-4} r={12} tilt={-90} />
      <path d={`M ${shX} ${shY-8} L ${hipX-6} ${hipY-8} L ${hipX+6} ${hipY+4} L ${shX} ${shY+6} Z`}
        fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" strokeLinejoin="round" />
      <Limb from={[hipX,hipY-4]} to={[kneeX,kneeY]} w={18} />
      <Limb from={[kneeX,kneeY]} to={[ankleX,ankleY]} w={16} />
      <Limb from={[shX-4,shY-4]} to={[shX-22,shY+16]} w={11} />
      <Limb from={[shX-22,shY+16]} to={[shX-8,shY+36]} w={10} />
    </g>
  )
}

function SupineFloor({ cx,floorY=248,limbsOut=false }:{cx:number;floorY?:number;limbsOut?:boolean}) {
  const head:[number,number]=[cx-60,floorY-12]
  const sh:[number,number]=[cx-42,floorY-14],hip:[number,number]=[cx+30,floorY-14]
  return (
    <g>
      <rect x={sh[0]} y={floorY-22} width={hip[0]-sh[0]} height="14" rx="7" fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" />
      <Head cx={head[0]} cy={head[1]} r={12} tilt={-90} />
      {limbsOut ? <>
        <Limb from={[sh[0]+2,floorY-16]} to={[sh[0]-18,floorY-40]} w={11} />
        <Limb from={[sh[0]-18,floorY-40]} to={[sh[0]-36,floorY-56]} w={10} />
        <Limb from={[sh[0]+2,floorY-12]} to={[sh[0]+8,floorY-56]} w={11} />
        <Limb from={[hip[0]-4,floorY-14]} to={[hip[0]+6,floorY-60]} w={17} />
        <Limb from={[hip[0]+6,floorY-60]} to={[hip[0]+36,floorY-60]} w={15} />
        <Limb from={[hip[0]+4,floorY-12]} to={[hip[0]+40,floorY-18]} w={17} />
        <Limb from={[hip[0]+40,floorY-18]} to={[hip[0]+80,floorY-18]} w={15} />
      </> : <>
        <Limb from={[sh[0],floorY-14]} to={[sh[0]-2,floorY-50]} w={11} />
        <Limb from={[hip[0],floorY-14]} to={[hip[0]+16,floorY-50]} w={17} />
        <Limb from={[hip[0]+16,floorY-50]} to={[hip[0]+48,floorY-50]} w={15} />
      </>}
    </g>
  )
}

function Kneeling({ cx,floorY=248,reach='back' }:{cx:number;floorY?:number;reach?:string}) {
  const head=reach==='out'?[cx-30,floorY-60]:[cx-4,floorY-76]
  const sh=reach==='out'?[cx-20,floorY-52]:[cx,floorY-64]
  const hip:[number,number]=[cx,floorY-28],knee:[number,number]=[cx+22,floorY-6]
  return (
    <g>
      <Shadow cx={cx+8} cy={floorY} rx={40} />
      <Limb from={knee} to={[cx+42,floorY-2]} w={16} />
      <Limb from={hip} to={knee} w={18} />
      <path d={`M ${sh[0]-11} ${sh[1]} L ${sh[0]+11} ${sh[1]+2} L ${hip[0]+8} ${hip[1]} L ${hip[0]-8} ${hip[1]-2} Z`}
        fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" strokeLinejoin="round" />
      {reach==='out' ? <>
        <Limb from={[sh[0]+4,sh[1]+2]} to={[cx-14,floorY-32]} w={11} />
        <Limb from={[cx-14,floorY-32]} to={[cx-50,floorY-8]} w={10} />
        <Limb from={[sh[0]+4,sh[1]-2]} to={[cx-14,floorY-36]} w={11} />
        <Limb from={[cx-14,floorY-36]} to={[cx-50,floorY-12]} w={10} />
      </> : <>
        <Limb from={[sh[0]+4,sh[1]]} to={[cx+8,floorY-36]} w={11} />
        <Limb from={[cx+8,floorY-36]} to={[cx-14,floorY-14]} w={10} />
        <Limb from={[sh[0]-4,sh[1]]} to={[cx-4,floorY-36]} w={11} />
        <Limb from={[cx-4,floorY-36]} to={[cx-22,floorY-12]} w={10} />
      </>}
      <Head cx={head[0]} cy={head[1]} r={12} tilt={reach==='out'?-50:0} />
    </g>
  )
}

function BentOverBench({ cx,benchY=210,armState='down' }:{cx:number;benchY?:number;armState?:string}) {
  const benchLeft=cx-40,benchRight=cx+70
  return (
    <g>
      <Head cx={benchLeft-16} cy={benchY-28} r={12} tilt={-80} />
      <rect x={benchLeft-8} y={benchY-38} width="80" height="16" rx="8" fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" />
      <Limb from={[benchLeft+6,benchY-30]} to={[benchLeft+6,benchY-4]} w={11} />
      <Limb from={[benchLeft+44,benchY-26]} to={[benchLeft+44,benchY-4]} w={14} />
      <Limb from={[benchLeft+60,benchY-24]} to={[benchRight+8,benchY-18]} w={17} />
      <Limb from={[benchRight+8,benchY-18]} to={[benchRight+32,benchY+26]} w={15} />
      {armState==='down' ? <>
        <Limb from={[benchLeft+20,benchY-32]} to={[benchLeft+18,benchY-4]} w={12} />
        <Limb from={[benchLeft+18,benchY-4]} to={[benchLeft+14,benchY+24]} w={11} />
      </> : <>
        <Limb from={[benchLeft+20,benchY-32]} to={[benchLeft+4,benchY-10]} w={12} />
        <Limb from={[benchLeft+4,benchY-10]} to={[benchLeft+22,benchY-2]} w={11} />
      </>}
    </g>
  )
}

function ProneIncline({ cx,armState='down' }:{cx:number;armState?:string}) {
  return (
    <g transform={`translate(${cx} 0)`}>
      <g transform="rotate(-30 0 200)">
        <rect x="-60" y="200" width="120" height="14" rx="3" fill={EQUIP_SOFT} />
      </g>
      <g transform="rotate(-30 0 200)">
        <rect x="-46" y="184" width="92" height="18" rx="9" fill={BODY} stroke={BODY_LINE} strokeWidth="1.1" />
        <Head cx={48} cy={190} r={12} />
      </g>
      {armState==='down' ? <>
        <Limb from={[-25,195]} to={[-30,240]} w={12} />
        <Limb from={[-30,240]} to={[-26,270]} w={11} />
        <Limb from={[15,175]} to={[18,220]} w={12} />
        <Limb from={[18,220]} to={[22,250]} w={11} />
      </> : <>
        <Limb from={[-25,195]} to={[-46,220]} w={12} />
        <Limb from={[-46,220]} to={[-30,230]} w={11} />
        <Limb from={[15,175]} to={[-6,200]} w={12} />
        <Limb from={[-6,200]} to={[10,210]} w={11} />
      </>}
    </g>
  )
}

function SeatedRow({ cx,floorY=250,armState='front' }:{cx:number;floorY?:number;armState?:string}) {
  const seatY=floorY-26,sh:[number,number]=[cx,floorY-110],hip:[number,number]=[cx,floorY-30]
  return (
    <g>
      <rect x={cx-18} y={seatY} width="36" height="10" rx="2" fill={EQUIP_SOFT} />
      <Torso shL={[sh[0]-13,sh[1]]} shR={[sh[0]+13,sh[1]]} hipL={[hip[0]-11,hip[1]]} hipR={[hip[0]+11,hip[1]]} />
      <Head cx={sh[0]} cy={sh[1]-18} r={12} />
      <Limb from={[hip[0]-6,hip[1]]} to={[cx-36,floorY-8]} w={18} />
      <Limb from={[cx-36,floorY-8]} to={[cx-76,floorY-4]} w={16} />
      <Limb from={[hip[0]+6,hip[1]]} to={[cx-36,floorY-8]} w={18} />
      {armState==='front' ? <>
        <Limb from={[sh[0]-12,sh[1]+4]} to={[sh[0]-32,sh[1]+10]} w={12} />
        <Limb from={[sh[0]-32,sh[1]+10]} to={[sh[0]-64,sh[1]+18]} w={11} />
        <Limb from={[sh[0]+12,sh[1]+4]} to={[sh[0]-32,sh[1]+10]} w={12} />
      </> : <>
        <Limb from={[sh[0]-12,sh[1]+4]} to={[sh[0]-30,sh[1]+16]} w={12} />
        <Limb from={[sh[0]-30,sh[1]+16]} to={[sh[0]-6,sh[1]+22]} w={11} />
        <Limb from={[sh[0]+12,sh[1]+4]} to={[sh[0]-30,sh[1]+16]} w={12} />
      </>}
    </g>
  )
}

function BSSPose({ cx,floorY=250,depth='top',bench=false }:{cx:number;floorY?:number;depth?:string;bench?:boolean}) {
  const benchY=floorY-36,top=depth==='bottom'?floorY-130:floorY-155
  const headC:[number,number]=[cx-2,top],sh=top+22
  const hipY=depth==='bottom'?floorY-64:floorY-90
  const frontKneeY=depth==='bottom'?floorY-28:floorY-50,frontKneeX=cx-6
  return (
    <g>
      <Shadow cx={cx} cy={floorY-2} rx={22} />
      {bench && <Bench x={cx+18} y={benchY-6} w={60} />}
      <Limb from={[cx+4,hipY]} to={[cx+28,benchY-4]} w={17} />
      <Limb from={[cx+28,benchY-4]} to={[cx+60,benchY-8]} w={14} />
      <Limb from={[cx-4,hipY]} to={[frontKneeX,frontKneeY]} w={18} />
      <Limb from={[frontKneeX,frontKneeY]} to={[cx,floorY-4]} w={16} />
      <Torso shL={[cx-12,sh]} shR={[cx+12,sh]} hipL={[cx-11,hipY]} hipR={[cx+11,hipY]} />
      <Limb from={[cx-11,sh+4]} to={[cx-16,sh+30]} w={11} />
      <Limb from={[cx-16,sh+30]} to={[cx-16,sh+56]} w={10} />
      <Limb from={[cx+11,sh+4]} to={[cx+16,sh+30]} w={11} />
      <Limb from={[cx+16,sh+30]} to={[cx+16,sh+56]} w={10} />
      <Head cx={headC[0]} cy={headC[1]} r={12} />
    </g>
  )
}

function PullupPose({ cx,barY=36,state='hang' }:{cx:number;barY?:number;state?:string}) {
  const headY=state==='hang'?barY+36:barY+16
  const shY=headY+14,hipY=state==='hang'?shY+64:shY+58,ankleY=hipY+86
  return (
    <g>
      <Limb from={[cx-14,shY]} to={[cx-18,barY+8]} w={11} />
      <Limb from={[cx+14,shY]} to={[cx+18,barY+8]} w={11} />
      <Torso shL={[cx-12,shY]} shR={[cx+12,shY]} hipL={[cx-10,hipY]} hipR={[cx+10,hipY]} />
      <Limb from={[cx-7,hipY]} to={[cx-5,hipY+44]} w={18} />
      <Limb from={[cx-5,hipY+44]} to={[cx-4,ankleY]} w={16} />
      <Limb from={[cx+7,hipY]} to={[cx+5,hipY+44]} w={18} />
      <Limb from={[cx+5,hipY+44]} to={[cx+4,ankleY]} w={16} />
      <Head cx={cx} cy={headY} r={12} />
    </g>
  )
}

// ─── The 25 exercise figures ──────────────────────────────────────────────────

function GobletSquatFig() {
  const c='#B8923A',fid='gobletSquat'
  return <FigureFrame color={c} fid={fid}>
    <Floor /><StandingTall cx={78} armPose="goblet" /><Dumbbell cx={78} cy={146} angle={90} size={1} />
    <SquatBottom cx={240} armPose="goblet" /><Dumbbell cx={240} cy={170} angle={90} size={1} />
    <Glow cx={218} cy={222} rx={8} ry={13} color={c} rotate={-25} /><Glow cx={262} cy={222} rx={8} ry={13} color={c} rotate={25} /><Glow cx={240} cy={196} rx={12} ry={7} color={c} />
    <MotionArrow d="M 130 160 Q 170 130 195 175" color={c} fid={fid} />
    <HandLabel x={163} y={130} text="sit BACK & down" color={c} />
    <PoseLabel x={78} y={275} text="START · TALL" /><PoseLabel x={240} y={275} text="END · BOTTOM" />
    <text x={295} y={228} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>QUADS + GLUTES</text>
  </FigureFrame>
}

function RDLDumbbellFig() {
  const c='#B8543A',fid='rdlDumbbell'
  return <FigureFrame color={c} fid={fid}>
    <Floor /><StandingTall cx={78} armPose="down" /><Dumbbell cx={62} cy={208} angle={0} size={0.85} /><Dumbbell cx={94} cy={208} angle={0} size={0.85} />
    <HingePose cx={240} depth="low" armPose="dbHold" faceDir={1} /><Dumbbell cx={250} cy={210} angle={0} size={0.85} /><Dumbbell cx={270} cy={210} angle={0} size={0.85} />
    <Glow cx={235} cy={186} rx={14} ry={9} color={c} rotate={-15} /><Glow cx={222} cy={208} rx={6} ry={11} color={c} rotate={-30} /><Glow cx={244} cy={208} rx={6} ry={11} color={c} rotate={20} />
    <MotionArrow d="M 130 140 Q 175 130 200 175" color={c} fid={fid} />
    <HandLabel x={165} y={122} text="hips back, not down" color={c} />
    <PoseLabel x={78} y={275} text="START · TALL" /><PoseLabel x={240} y={275} text="END · HINGED" />
    <text x={300} y={188} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>HAMSTRINGS</text>
  </FigureFrame>
}

function RDLBarbellFig() {
  const c='#B8543A',fid='rdlBarbell'
  return <FigureFrame color={c} fid={fid}>
    <Floor /><StandingTall cx={78} armPose="down" /><Barbell cx={78} cy={208} length={68} plates={2} />
    <HingePose cx={240} depth="low" armPose="bbHold" faceDir={1} /><Barbell cx={252} cy={206} length={68} plates={2} />
    <Glow cx={235} cy={186} rx={14} ry={9} color={c} rotate={-15} /><Glow cx={222} cy={208} rx={6} ry={11} color={c} rotate={-30} /><Glow cx={244} cy={208} rx={6} ry={11} color={c} rotate={20} />
    <Glow cx={250} cy={166} rx={6} ry={11} color={c} rotate={-20} opacity={0.55} />
    <MotionArrow d="M 130 140 Q 175 130 200 175" color={c} fid={fid} />
    <HandLabel x={165} y={122} text="bar stays close" color={c} />
    <PoseLabel x={78} y={275} text="START" /><PoseLabel x={240} y={275} text="END · STRETCH" />
    <text x={300} y={188} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>HAMS · LATS</text>
  </FigureFrame>
}

function HipThrustFig() {
  const c='#B8543A',fid='hipThrust'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <Bench x={26} y={206} w={58} /><Bench x={196} y={206} w={58} />
    <HipBridge cx={78} benchY={210} bridged={false} /><HipBridge cx={246} benchY={210} bridged={true} />
    <Barbell cx={266} cy={186} length={50} plates={1} />
    <Glow cx={260} cy={188} rx={14} ry={9} color={c} />
    <MotionArrow d="M 130 200 Q 170 162 200 190" color={c} fid={fid} />
    <HandLabel x={165} y={150} text="drive hips UP" color={c} />
    <PoseLabel x={78} y={275} text="START · DOWN" /><PoseLabel x={246} y={275} text="END · LOCKOUT" />
    <text x={310} y={196} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>GLUTES</text>
  </FigureFrame>
}

function SeatedCableRowFig() {
  const c='#7A8B6E',fid='seatedCableRow'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <CableTower x={300} y={150} h={100} pulleyY={220} />
    <SeatedRow cx={78} armState="front" /><CableLine from={[14,220]} to={[300,220]} />
    <SeatedRow cx={236} armState="back" /><CableLine from={[170,218]} to={[300,220]} />
    <Glow cx={224} cy={166} rx={9} ry={14} color={c} rotate={-15} /><Glow cx={248} cy={166} rx={9} ry={14} color={c} rotate={15} />
    <MotionArrow d="M 130 196 Q 165 178 195 196" color={c} fid={fid} />
    <HandLabel x={163} y={172} text="elbows to hips" color={c} />
    <PoseLabel x={78} y={275} text="START · REACH" /><PoseLabel x={236} y={275} text="END · SQUEEZE" />
    <text x={290} y={164} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>LATS · MID-BACK</text>
  </FigureFrame>
}

function DeadBugFig() {
  const c='#5E7A8C',fid='deadBug'
  return <FigureFrame color={c} fid={fid}>
    <Floor y={246} />
    <g><SupineFloor cx={78} floorY={246} limbsOut={false} /></g>
    <g transform="translate(160 0)"><SupineFloor cx={78} floorY={246} limbsOut={true} /></g>
    <Glow cx={232} cy={232} rx={14} ry={8} color={c} />
    <MotionArrow d="M 130 220 Q 170 240 195 232" color={c} fid={fid} />
    <HandLabel x={163} y={212} text="opposite arm + leg" color={c} />
    <PoseLabel x={78} y={275} text="START · BUG" /><PoseLabel x={240} y={275} text="END · EXTEND" />
    <text x={300} y={258} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>DEEP CORE</text>
  </FigureFrame>
}

function BarbellBackSquatFig() {
  const c='#B8923A',fid='barbellBackSquat'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <StandingTall cx={78} armPose="overhead-bent" /><Barbell cx={78} cy={130} length={80} plates={2} />
    <SquatBottom cx={240} armPose="barback" /><Barbell cx={240} cy={148} length={80} plates={2} />
    <Glow cx={218} cy={222} rx={8} ry={13} color={c} rotate={-25} /><Glow cx={262} cy={222} rx={8} ry={13} color={c} rotate={25} /><Glow cx={240} cy={196} rx={12} ry={7} color={c} />
    <MotionArrow d="M 130 175 Q 170 145 195 180" color={c} fid={fid} />
    <HandLabel x={165} y={138} text="brace · sit · drive" color={c} />
    <PoseLabel x={78} y={275} text="START · RACKED" /><PoseLabel x={240} y={275} text="END · DEPTH" />
    <text x={295} y={228} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>QUADS + GLUTES</text>
  </FigureFrame>
}

function SingleArmDbRowFig() {
  const c='#7A8B6E',fid='singleArmDbRow'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <Bench x={20} y={216} w={90} />
    <BentOverBench cx={64} benchY={216} armState="down" /><Dumbbell cx={68} cy={236} angle={90} size={0.85} />
    <Bench x={190} y={216} w={90} />
    <BentOverBench cx={234} benchY={216} armState="up" /><Dumbbell cx={216} cy={206} angle={90} size={0.85} />
    <Glow cx={228} cy={188} rx={11} ry={9} color={c} rotate={-15} />
    <MotionArrow d="M 130 215 Q 165 200 195 208" color={c} fid={fid} />
    <HandLabel x={163} y={196} text="elbow to hip" color={c} />
    <PoseLabel x={68} y={275} text="START · HANG" /><PoseLabel x={234} y={275} text="END · PULL" />
    <text x={300} y={184} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>LATS · ONE SIDE</text>
  </FigureFrame>
}

function BarbellBenchFig() {
  const c='#C26A5C',fid='barbellBench'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <Bench x={14} y={228} w={120} /><SupineBench cx={78} benchY={222} armPose="benchTop" /><Barbell cx={92} cy={132} length={90} plates={2} />
    <Bench x={184} y={228} w={120} /><SupineBench cx={248} benchY={222} armPose="benchBottom" /><Barbell cx={262} cy={170} length={90} plates={2} />
    <Glow cx={224} cy={194} rx={13} ry={8} color={c} />
    <MotionArrow d="M 142 152 Q 178 170 218 170" color={c} fid={fid} />
    <HandLabel x={183} y={146} text="touch chest" color={c} />
    <PoseLabel x={78} y={275} text="START · LOCKED" /><PoseLabel x={248} y={275} text="END · TOUCH" />
    <text x={300} y={184} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>CHEST</text>
  </FigureFrame>
}

function BarbellRowFig() {
  const c='#7A8B6E',fid='barbellRow'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <HingePose cx={78} depth="mid" armPose="bbHold" faceDir={1} /><Barbell cx={92} cy={216} length={80} plates={2} />
    <HingePose cx={240} depth="mid" armPose="rowBarbell" faceDir={1} /><Barbell cx={222} cy={194} length={80} plates={2} />
    <Glow cx={224} cy={170} rx={9} ry={14} color={c} rotate={-12} /><Glow cx={250} cy={170} rx={9} ry={14} color={c} rotate={12} />
    <MotionArrow d="M 140 198 Q 175 186 200 196" color={c} fid={fid} />
    <HandLabel x={170} y={178} text="pull to sternum" color={c} />
    <PoseLabel x={78} y={275} text="START · HANG" /><PoseLabel x={240} y={275} text="END · ROW" />
    <text x={300} y={166} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>LATS · MID-BACK</text>
  </FigureFrame>
}

function BulgarianSplitSquatFig() {
  const c='#B8923A',fid='bulgarianSplitSquat'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <BSSPose cx={78} depth="top" bench={true} /><BSSPose cx={210} depth="bottom" bench={true} />
    <Glow cx={204} cy={216} rx={7} ry={13} color={c} rotate={-20} /><Glow cx={212} cy={196} rx={10} ry={6} color={c} />
    <MotionArrow d="M 130 178 Q 160 158 180 184" color={c} fid={fid} />
    <HandLabel x={156} y={150} text="straight DOWN" color={c} />
    <PoseLabel x={78} y={275} text="START · TALL" /><PoseLabel x={216} y={275} text="END · LOW" />
    <text x={310} y={222} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>QUAD + GLUTE</text>
  </FigureFrame>
}

function FacePullFig() {
  const c='#7A8B6E',fid='facePull'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <CableTower x={6} y={20} h={80} pulleyY={70} />
    <StandingTall cx={104} armPose="overhead" /><CableLine from={[6,70]} to={[94,100]} /><CableLine from={[6,70]} to={[114,100]} />
    <StandingTall cx={244} armPose="face-pull" /><CableLine from={[6,70]} to={[236,116]} /><CableLine from={[6,70]} to={[252,116]} />
    <RopeHandle cx={94} cy={100} angle={-30} /><RopeHandle cx={114} cy={100} angle={30} />
    <RopeHandle cx={236} cy={116} angle={-30} /><RopeHandle cx={252} cy={116} angle={30} />
    <Glow cx={222} cy={140} rx={8} ry={6} color={c} /><Glow cx={266} cy={140} rx={8} ry={6} color={c} />
    <MotionArrow d="M 150 110 Q 185 110 215 122" color={c} fid={fid} />
    <HandLabel x={178} y={94} text="elbows HIGH" color={c} />
    <PoseLabel x={104} y={275} text="START · REACH" /><PoseLabel x={244} y={275} text="END · SPLIT" />
    <text x={310} y={138} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>REAR DELTS</text>
  </FigureFrame>
}

function ConventionalDeadliftFig() {
  const c='#B8543A',fid='conventionalDeadlift'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <HingePose cx={78} depth="deep" armPose="dbHold" faceDir={1} /><Barbell cx={90} cy={246} length={80} plates={2} />
    <StandingTall cx={240} armPose="down" /><Barbell cx={240} cy={208} length={80} plates={2} />
    <Glow cx={70} cy={196} rx={10} ry={7} color={c} rotate={-30} />
    <Glow cx={68} cy={216} rx={6} ry={11} color={c} rotate={-40} /><Glow cx={82} cy={216} rx={6} ry={11} color={c} rotate={20} />
    <MotionArrow d="M 130 200 Q 170 160 195 175" color={c} fid={fid} />
    <HandLabel x={165} y={150} text="drive THROUGH floor" color={c} />
    <PoseLabel x={78} y={275} text="START · GROUND" /><PoseLabel x={240} y={275} text="END · LOCKOUT" />
    <text x={20} y={186} fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>FULL POSTERIOR</text>
  </FigureFrame>
}

function AbWheelFig() {
  const c='#5E7A8C',fid='abWheel'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <Kneeling cx={78} reach="back" /><AbWheel cx={56} cy={244} angle={0} />
    <Kneeling cx={220} reach="out" /><AbWheel cx={170} cy={244} angle={0} />
    <Glow cx={216} cy={208} rx={14} ry={7} color={c} />
    <MotionArrow d="M 130 220 Q 165 208 195 218" color={c} fid={fid} />
    <HandLabel x={165} y={196} text="brace HARD · roll" color={c} />
    <PoseLabel x={78} y={275} text="START · KNEEL" /><PoseLabel x={224} y={275} text="END · EXTEND" />
    <text x={304} y={196} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>FRONT CORE</text>
  </FigureFrame>
}

function CablePullThroughFig() {
  const c='#B8543A',fid='cablePullThrough'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <CableTower x={4} y={210} h={42} pulleyY={236} />
    <HingePose cx={108} depth="low" armPose="ropeBetweenLegs" faceDir={1} /><CableLine from={[4,236]} to={[90,240]} /><RopeHandle cx={92} cy={240} angle={0} />
    <StandingTall cx={240} armPose="down" /><CableLine from={[4,236]} to={[230,224]} /><RopeHandle cx={234} cy={224} angle={0} />
    <Glow cx={240} cy={186} rx={12} ry={8} color={c} />
    <MotionArrow d="M 154 220 Q 190 198 215 198" color={c} fid={fid} />
    <HandLabel x={185} y={184} text="hips THROUGH" color={c} />
    <PoseLabel x={108} y={275} text="START · HINGE" /><PoseLabel x={240} y={275} text="END · SQUEEZE" />
    <text x={310} y={186} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>GLUTES</text>
  </FigureFrame>
}

function RearDeltFlyFig() {
  const c='#7A8B6E',fid='rearDeltFly'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <HingePose cx={78} depth="mid" armPose="dbHold" faceDir={1} /><Dumbbell cx={78} cy={218} angle={0} size={0.8} />
    <HingePose cx={240} depth="mid" armPose="flyOut" faceDir={1} />
    <Dumbbell cx={290} cy={176} angle={0} size={0.8} /><Dumbbell cx={190} cy={176} angle={0} size={0.8} />
    <Glow cx={222} cy={156} rx={8} ry={6} color={c} /><Glow cx={264} cy={156} rx={8} ry={6} color={c} />
    <MotionArrow d="M 135 198 Q 170 170 195 180" color={c} fid={fid} />
    <HandLabel x={170} y={158} text="lead with ELBOWS" color={c} />
    <PoseLabel x={78} y={275} text="START · DOWN" /><PoseLabel x={240} y={275} text="END · WIDE" />
    <text x={310} y={146} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>REAR DELTS</text>
  </FigureFrame>
}

function EZBarCurlFig() {
  const c='#9C7A3A',fid='ezBarCurl'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <StandingTall cx={78} armPose="curl-bottom" /><Barbell cx={78} cy={188} length={56} plates={1} />
    <StandingTall cx={240} armPose="curl-top" /><Barbell cx={240} cy={138} length={56} plates={1} />
    <Glow cx={224} cy={150} rx={6} ry={9} color={c} rotate={-20} /><Glow cx={256} cy={150} rx={6} ry={9} color={c} rotate={20} />
    <MotionArrow d="M 130 168 Q 170 138 200 148" color={c} fid={fid} />
    <HandLabel x={167} y={130} text="elbows PINNED" color={c} />
    <PoseLabel x={78} y={275} text="START · EXTEND" /><PoseLabel x={240} y={275} text="END · SQUEEZE" />
    <text x={310} y={146} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>BICEPS</text>
  </FigureFrame>
}

function CableFlyFig() {
  const c='#C26A5C',fid='cableFly'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <CableTower x={4} y={20} h={120} pulleyY={120} /><CableTower x={316} y={20} h={120} pulleyY={120} />
    <StandingTall cx={104} armPose="cable-fly-open" />
    <CableLine from={[4,120]} to={[42,156]} /><CableLine from={[316,120]} to={[170,156]} />
    <StandingTall cx={236} armPose="cable-fly-closed" />
    <CableLine from={[4,120]} to={[232,168]} /><CableLine from={[316,120]} to={[240,168]} />
    <Glow cx={236} cy={170} rx={13} ry={8} color={c} />
    <MotionArrow d="M 150 156 Q 195 168 215 168" color={c} fid={fid} />
    <HandLabel x={183} y={138} text="hug a tree" color={c} />
    <PoseLabel x={104} y={275} text="START · WIDE" /><PoseLabel x={236} y={275} text="END · CLOSED" />
    <text x={236} y={195} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>CHEST</text>
  </FigureFrame>
}

function LateralRaiseFig() {
  const c='#C26A5C',fid='lateralRaise'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <StandingTall cx={78} armPose="lateral-down" /><Dumbbell cx={60} cy={210} angle={0} size={0.8} /><Dumbbell cx={96} cy={210} angle={0} size={0.8} />
    <StandingTall cx={240} armPose="lateral-up" /><Dumbbell cx={172} cy={132} angle={0} size={0.8} /><Dumbbell cx={308} cy={132} angle={0} size={0.8} />
    <Glow cx={222} cy={140} rx={6} ry={6} color={c} /><Glow cx={258} cy={140} rx={6} ry={6} color={c} />
    <MotionArrow d="M 130 178 Q 165 140 195 138" color={c} fid={fid} />
    <HandLabel x={163} y={120} text="STOP at shoulders" color={c} />
    <PoseLabel x={78} y={275} text="START · DOWN" /><PoseLabel x={240} y={275} text="END · T-POSE" />
    <text x={310} y={130} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>SIDE DELTS</text>
  </FigureFrame>
}

function HammerCurlFig() {
  const c='#9C7A3A',fid='hammerCurl'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <StandingTall cx={78} armPose="curl-bottom" /><Dumbbell cx={62} cy={210} angle={90} size={0.85} /><Dumbbell cx={94} cy={210} angle={90} size={0.85} />
    <StandingTall cx={240} armPose="curl-top" /><Dumbbell cx={232} cy={140} angle={90} size={0.85} /><Dumbbell cx={248} cy={140} angle={90} size={0.85} />
    <Glow cx={216} cy={154} rx={5} ry={9} color={c} rotate={-15} /><Glow cx={264} cy={154} rx={5} ry={9} color={c} rotate={15} />
    <MotionArrow d="M 130 168 Q 170 140 200 148" color={c} fid={fid} />
    <HandLabel x={167} y={130} text="palms FACE EACH OTHER" color={c} />
    <PoseLabel x={78} y={275} text="START · NEUTRAL" /><PoseLabel x={240} y={275} text="END · SQUEEZE" />
    <text x={310} y={148} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>BRACHIALIS</text>
  </FigureFrame>
}

function ChestSupportedRowFig() {
  const c='#7A8B6E',fid='chestSupportedRow'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <ProneIncline cx={90} armState="down" /><Dumbbell cx={60} cy={266} angle={90} size={0.85} /><Dumbbell cx={104} cy={244} angle={90} size={0.85} />
    <ProneIncline cx={246} armState="up" /><Dumbbell cx={200} cy={226} angle={90} size={0.85} /><Dumbbell cx={256} cy={206} angle={90} size={0.85} />
    <Glow cx={232} cy={186} rx={8} ry={11} color={c} rotate={-20} /><Glow cx={272} cy={172} rx={8} ry={11} color={c} rotate={20} />
    <MotionArrow d="M 140 240 Q 180 210 215 212" color={c} fid={fid} />
    <HandLabel x={180} y={194} text="chest STAYS on pad" color={c} />
    <PoseLabel x={90} y={275} text="START · HANG" /><PoseLabel x={246} y={275} text="END · ROW" />
    <text x={306} y={186} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>PURE MID-BACK</text>
  </FigureFrame>
}

function TricepPushdownFig() {
  const c='#9C7A3A',fid='tricepPushdown'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <CableTower x={78} y={10} h={120} pulleyY={50} />
    <StandingTall cx={108} armPose="pushdown-top" /><CableLine from={[78,50]} to={[110,108]} /><RopeHandle cx={110} cy={110} angle={0} />
    <CableTower x={240} y={10} h={120} pulleyY={50} />
    <StandingTall cx={270} armPose="pushdown-bottom" /><CableLine from={[240,50]} to={[270,162]} /><RopeHandle cx={270} cy={162} angle={0} />
    <Glow cx={284} cy={138} rx={5} ry={11} color={c} rotate={10} />
    <MotionArrow d="M 145 124 Q 195 150 235 150" color={c} fid={fid} />
    <HandLabel x={185} y={108} text="elbows PINNED" color={c} />
    <PoseLabel x={108} y={275} text="START · UP" /><PoseLabel x={270} y={275} text="END · LOCK" />
    <text x={310} y={136} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>TRICEPS</text>
  </FigureFrame>
}

function OverheadTricepExtFig() {
  const c='#9C7A3A',fid='overheadTricepExt'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <StandingTall cx={78} armPose="overhead" /><Dumbbell cx={78} cy={86} angle={90} size={0.9} />
    <StandingTall cx={240} armPose="overhead-bent" /><Dumbbell cx={240} cy={152} angle={90} size={0.9} />
    <Glow cx={222} cy={132} rx={5} ry={10} color={c} rotate={-12} /><Glow cx={258} cy={132} rx={5} ry={10} color={c} rotate={12} />
    <MotionArrow d="M 122 100 Q 170 134 200 144" color={c} fid={fid} />
    <HandLabel x={170} y={122} text="elbows FORWARD" color={c} />
    <PoseLabel x={78} y={275} text="START · LOCKED" /><PoseLabel x={240} y={275} text="END · STRETCH" />
    <text x={310} y={132} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>TRICEPS · LONG HEAD</text>
  </FigureFrame>
}

function CableCurlFig() {
  const c='#9C7A3A',fid='cableCurl'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <CableTower x={4} y={210} h={42} pulleyY={236} />
    <StandingTall cx={104} armPose="curl-bottom" /><CableLine from={[4,236]} to={[88,232]} /><Barbell cx={104} cy={228} length={44} plates={1} />
    <StandingTall cx={244} armPose="curl-top" /><CableLine from={[4,236]} to={[228,156]} /><Barbell cx={244} cy={148} length={44} plates={1} />
    <Glow cx={228} cy={158} rx={6} ry={9} color={c} rotate={-20} /><Glow cx={260} cy={158} rx={6} ry={9} color={c} rotate={20} />
    <MotionArrow d="M 155 200 Q 195 168 225 160" color={c} fid={fid} />
    <HandLabel x={190} y={140} text="constant TENSION" color={c} />
    <PoseLabel x={104} y={275} text="START · EXTEND" /><PoseLabel x={244} y={275} text="END · CURL" />
    <text x={310} y={150} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>BICEPS</text>
  </FigureFrame>
}

function WeightedPullupFig() {
  const c='#7A8B6E',fid='weightedPullup'
  return <FigureFrame color={c} fid={fid}>
    <Floor />
    <PullupBar x1={20} x2={140} y={38} /><PullupPose cx={78} barY={38} state="hang" /><Dumbbell cx={78} cy={228} angle={90} size={0.85} />
    <PullupBar x1={180} x2={300} y={38} /><PullupPose cx={240} barY={38} state="top" /><Dumbbell cx={240} cy={212} angle={90} size={0.85} />
    <Glow cx={224} cy={110} rx={9} ry={14} color={c} rotate={-15} /><Glow cx={256} cy={110} rx={9} ry={14} color={c} rotate={15} />
    <MotionArrow d="M 140 110 Q 175 90 200 95" color={c} fid={fid} />
    <HandLabel x={170} y={82} text="chin OVER bar" color={c} />
    <PoseLabel x={78} y={275} text="START · DEAD HANG" /><PoseLabel x={240} y={275} text="END · CHIN OVER" />
    <text x={310} y={108} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={c}>LATS · BENCHMARK</text>
  </FigureFrame>
}

// ─── Name → figure mapping ────────────────────────────────────────────────────

const FIGURES: Record<string, React.ComponentType> = {
  'Goblet Squat': GobletSquatFig,
  'Goblet Squat (Progression)': GobletSquatFig,
  'Goblet Squat — Full Circle': GobletSquatFig,

  'Romanian Deadlift (Dumbbells)': RDLDumbbellFig,
  'Romanian Deadlift (Progression)': RDLDumbbellFig,
  'Romanian Deadlift — Range Focus': RDLDumbbellFig,
  'Romanian Deadlift — 4×12': RDLBarbellFig,

  'Hip Thrust (Bodyweight)': HipThrustFig,
  'Hip Thrust (Loaded)': HipThrustFig,
  'Hip Thrust — 5 Sets Personal Best': HipThrustFig,
  'Hip Thrust — 60% Load, Full Squeeze Focus': HipThrustFig,

  'Seated Cable Row': SeatedCableRowFig,
  'Barbell Row': BarbellRowFig,
  'Single Arm DB Row': SingleArmDbRowFig,
  'Chest Supported Row': ChestSupportedRowFig,

  'Dead Bug': DeadBugFig,

  'Barbell Back Squat': BarbellBackSquatFig,
  'Barbell Back Squat — Technique Focus': BarbellBackSquatFig,
  'Barbell Back Squat — Personal Best': BarbellBackSquatFig,

  'Barbell Bench Press': BarbellBenchFig,

  'Bulgarian Split Squat': BulgarianSplitSquatFig,
  'Bulgarian Split Squat (Weighted)': BulgarianSplitSquatFig,

  'Face Pull': FacePullFig,
  'Face Pull (4×20)': FacePullFig,
  'Face Pull — Shoulder Reset': FacePullFig,

  'Conventional Deadlift': ConventionalDeadliftFig,
  'Deadlift — 5×3 at RPE 9': ConventionalDeadliftFig,

  'Cable Fly': CableFlyFig,

  'EZ Bar Curl': EZBarCurlFig,
  'Hammer Curl': HammerCurlFig,
  'Cable Curl': CableCurlFig,
  'Full Curl Giant Set — EZ + Hammer + Cable': EZBarCurlFig,
  'Curl Superset — EZ Bar + Hammer': EZBarCurlFig,

  'Tricep Pushdown': TricepPushdownFig,
  'Overhead Tricep Extension': OverheadTricepExtFig,
  'Tricep Superset — Pushdown + Overhead Extension': TricepPushdownFig,

  'Lateral Raise': LateralRaiseFig,
  'Rear Delt Fly': RearDeltFlyFig,
  'Dumbbell Shoulder Press': LateralRaiseFig,

  'Weighted Pull-Up': WeightedPullupFig,
  'Pull-Up': WeightedPullupFig,

  'Cable Pull-Through': CablePullThroughFig,
  'Glute Kickback': CablePullThroughFig,

  'Leg Press': GobletSquatFig,
  'Plank': DeadBugFig,
  'Pallof Press': DeadBugFig,
  'Walking Lunge': BulgarianSplitSquatFig,
}

export function ExerciseFigure({ name }: { name: string }) {
  const Fig = FIGURES[name]
  if (!Fig) {
    return (
      <div style={{
        width: '100%', height: 160,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--paper-deep)', borderRadius: 6,
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)',
        letterSpacing: '0.12em',
      }}>
        FIGURE PENDING
      </div>
    )
  }
  return <Fig />
}
