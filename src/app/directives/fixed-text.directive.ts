import { Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { FixedTextBuilder } from './fixedTextBuilder';

@Directive({
  selector: '[fixedText]',
  standalone: true
})
export class FixedTextDirective {

  constructor(private fixedTextBuilder: FixedTextBuilder, private renderer: Renderer2, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {     
  }

  @Input() set fixedText(text: string) {    

    this.viewContainer.clear();    
    const embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
    var rootNode = embeddedView.rootNodes[0];        
    
    const addSpan = (txt: string, cssClass: string) => { 
      const span = this.renderer.createElement('span');    
      this.renderer.addClass(span, cssClass);
      const spanText = this.renderer.createText(txt);
      this.renderer.appendChild(span, spanText);  
      this.renderer.appendChild(rootNode, span);
    }

    const addButton = () => { 
      const button = this.renderer.createElement('button');
      this.renderer.listen(button, 'click', () => {
        console.log('Span был кликнут!');      
      });  
      this.renderer.appendChild(rootNode, button);
    }

    this.fixedTextBuilder.Build(text, (t: string) => addSpan(t, "ft-correct"), 
                                      (t: string) => addSpan(t, "ft-error"), 
                                      (t: string) => addSpan(t, "ft-fixed"),
                                      addButton);    

    /*embeddedView.rootNodes.forEach(rootNode1 => {
            const ch = rootNode1;
            ch.textContent = "eeeeeeeeeee";
            if (rootNode1.nodeType === Node.ELEMENT_NODE) {
              this.renderer.appendChild(rootNode1, span);
              this.renderer.appendChild(rootNode, button);
            }
          });*/


    //let span = this.renderer.createElement('span');
    //this.renderer.setProperty(span, 'textContent', "sdfsdf sdfsdfs dfit");
    //this.renderer.setAttribute(span, 'style', "color: red;");
    //this.renderer.appendChild(this.el.nativeElement, span);

    //this.viewContainer.clear();    
    //const embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
    //var rootNode = embeddedView.rootNodes[0];    
    //rootNode.textContent = text;

    
    

  }
}

    //const span = this.renderer.createElement('span');    
    //this.renderer.addClass(span, "removed-text");
    //const spanText = this.renderer.createText(text);
    //this.renderer.appendChild(span, spanText);

    //const button = this.renderer.createElement('button');
    //this.renderer.listen(button, 'click', () => {
      //console.log('Span был кликнут!');      
    //});

          
    //embeddedView.rootNodes.forEach(rootNode1 => {
//      const ch = rootNode1.children[0];
      //ch.textContent = "eeeeeeeeeee";
      //if (rootNode1.nodeType === Node.ELEMENT_NODE) {
//        this.renderer.appendChild(rootNode1, span);
        //this.renderer.appendChild(rootNode, button);
      //}
    //});
