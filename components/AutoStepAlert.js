
export const AutoStepAlert = ({ autoStep, location }) => (<>
  {!autoStep && location.pathname == '/questionary' ? <div style={{position:"absolute", width: "max-content", right: "1em"}}>
    <span style={{color:"firebrick", fontSize: ".8em"}}>
      Auto-Step Disabled
    </span>
    <svg width="30" height="30" fill="firebrick">
      <g>
      <path 
        d="m27.65202,8.6243l-5.59265,-6.49232l-5.59265,6.49232l1.38585,1.60878l3.78993,-4.39968c1.54957,6.59463 -1.33705,13.67592 -6.91696,16.35904c-3.86363,1.85784 -8.18822,1.25378 -11.56853,-1.61599l-1.157,1.83653c1.88314,1.59877 4.10097,2.62761 6.41372,2.97549c0.58457,0.0879 1.17242,0.13151 1.75986,0.13151c1.80978,0 3.61504,-0.41439 5.30187,-1.22549c5.86358,-2.81956 9.1736,-9.80787 8.44138,-16.78867l2.34934,2.72727l1.38585,-1.60878z"/>
      </g>
    </svg>
  </div> : null}
</>
)