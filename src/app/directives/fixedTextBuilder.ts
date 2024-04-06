import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FixedTextBuilder {

  public Build(text: string, 
    addCorrectText: (text: string) => void, 
    addErrorText: (text: string) => void, 
    addFixedText: (text: string) => void,
    addButton: () => void) {          
      
      if (text == null || text == "")
        return;
    
    const segments: any = text.split(/(%er%|%add%|%\/%|%eos%|%eoes%)/g);
    
    let errIndex = -1;
    let currentStyle: string | null = null;
    for (const segment of segments) {
      if (segment === '%er%' || segment === '%add%') {
        currentStyle = segment;        
      } else if (segment === '%/%') {
        currentStyle = null;          
      } else if (segment === '%eos%') {          
      }
      else if (segment === '%eoes%') {
        errIndex++;
        addButton();        
        // (function(index){
          //return <button className='error-button' onClick={() => onErrorButtonClick(index)}                 
                    //ref = {el => errorButtonRefs.current[index] = el}>?
                  //</button>          
      }
      else {
        if (currentStyle == null) 
          addCorrectText(segment);
        else if (currentStyle === '%er%') 
          addErrorText(segment);
        else if (currentStyle === '%add%') 
          addFixedText(segment);
      } 
    }     

  }

}