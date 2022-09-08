$(document).ready(function(){
    
    $('.input-resultado').val(0);
   var operando1 = "";
   var operando2 = "";
   var op1 = "";
   var op2 = "";
   
   var url = document.location.href;
   
   var operacion = null;
  
  var operando1x = "";
  var vaultLength;

  
  var myOper = {
      number1:'',
      op_arit:'',
      number2:'',
      op_esp:'',
      resultado:'',
      completada:false     

  }
   

  operationsVault = [];
  

   function cleanScreen(){
        $('.input-resultado').val("");
    }

    function setCopyOp(number1,op_arit,number2,resultado,op_esp){
        var opCopy = new Object();
        opCopy.number1 = number1;
        opCopy.number2 = number2;
        opCopy.op_arit = op_arit;
        opCopy.resultado = resultado;
        opCopy.op_esp = op_esp
        operationsVault.push(opCopy);
    }

    function clearOpObject(){
        myOper.number1 = "";
        myOper.number2 = "";
        myOper.op_arit = "";
        myOper.op_esp = "";
        myOper.resultado = "";
        myOper.completada = false               
        operando1 = "";
        operando2 = "";
    }

    function schowAritResults(){
        $('.input-resultado').val(myOper.resultado);
        $('.process-window').text(myOper.number1+myOper.op_arit+myOper.number2 + "=");
    }

    $('.op-table a').on('click',function(){

        if(myOper.number1 == ""){
            $('.process-window').text("");
        }
        if($(this).attr('class') == 'btn-number'){           
            operando1+=$(this).attr('value');           
            $('.input-resultado').val(operando1);
           
        }    
           
    });

    $('.op-table a').on('click',function(){
        if($(this).attr('class') == 'op-aritmetico'){
            myOper.number1 = operando1;            
            myOper.op_arit = $(this).attr('value');          
            $('.process-window').text(myOper.number1 +""+myOper.op_arit);            
        }
        if($(this).attr('class') == 'op-esp'){
            myOper.number1 = operando1;
            myOper.op_esp = $(this).attr('value');
        }
         
        switch(myOper.op_esp){
            case '1/x':
                myOper.resultado = parseFloat(1 / myOper.number1);
                $('.input-resultado').val(myOper.resultado);
                $('.process-window').text("1/"+"("+myOper.number1+")");
                setCopyOp(myOper.number1,myOper.op_arit,myOper.number2,myOper.resultado,myOper.op_esp);                
                clearOpObject();                
                break;
            case 'X²':    
                myOper.resultado = parseFloat(myOper.number1 * myOper.number1);
                $('.input-resultado').val(myOper.resultado);
                $('.process-window').text("sqr("+myOper.number1+")");
                setCopyOp(myOper.number1,myOper.op_arit,myOper.number2,myOper.resultado,myOper.op_esp);                
                clearOpObject();
                break;
            case '√(2&X)':
                myOper.resultado = parseFloat(Math.sqrt(myOper.number1));
                $('.input-resultado').val(myOper.resultado);
                $('.process-window').text("√("+myOper.number1+")");
                setCopyOp(myOper.number1,myOper.op_arit,myOper.number2,myOper.resultado,myOper.op_esp);                
                clearOpObject();
                break;
                default:
                 
                    return;
        }
        console.log(operationsVault);
        vaultLength = operationsVault.length;
        console.log(operationsVault.length);
        $('.complete-operation').css('display','block');
        switch(operationsVault[vaultLength-1]['op_esp']){
            case '1/x':
                    $('.proceso').append("<div class='operacion'>"
                    +"<p>1/("+operationsVault[vaultLength-1]['number1']+") = "
                    + operationsVault[vaultLength-1]['resultado']+"</p>"
                    +"</div>");
                break;
                case 'X²':
                    $('.proceso').append("<div class='operacion'>"
                    +"<p>sqr("+operationsVault[vaultLength-1]['number1']+") = "
                    + operationsVault[vaultLength-1]['resultado']+"</p>"
                    +"</div>");
                break;
                case '√(2&X)':
                    $('.proceso').append("<div class='operacion'>"
                    +"<p>√("+operationsVault[vaultLength-1]['number1']+") = "
                    + operationsVault[vaultLength-1]['resultado']+"</p>"
                    +"</div>");
                    break;
                default:
                    return null;
        }
    });

    $('.op-table a').on('click',function(){
        if($(this).attr('class') == 'btn-number' && myOper.op_arit != ""){          
            operando2+=$(this).attr('value');
            $('.input-resultado').val(operando2);
            myOper.number2 = operando2;           
        }
        
    });

    
   

    $('.btn-equal').on('click',function(){  
        if(myOper.completada == true){
            myOper = {};
            $('.input-resultado').val("");
        }
        
        switch(myOper.op_arit){
            case '÷':
                myOper.resultado = parseFloat(myOper.number1 / myOper.number2);
                schowAritResults();
                setCopyOp(myOper.number1,myOper.op_arit,myOper.number2,myOper.resultado);                
                clearOpObject();                
                break;
            case 'x':
                myOper.resultado = parseFloat(myOper.number1 * myOper.number2);
                schowAritResults();
                setCopyOp(myOper.number1,myOper.op_arit,myOper.number2,myOper.resultado);                
                clearOpObject();
                break;
            case '-':
                myOper.resultado = parseFloat(myOper.number1 - myOper.number2);
                schowAritResults();
                setCopyOp(myOper.number1,myOper.op_arit,myOper.number2,myOper.resultado);                
                clearOpObject();
                break;
            case '+':
                myOper.resultado = parseFloat(myOper.number1) + parseFloat(myOper.number2);
                schowAritResults();
                setCopyOp(myOper.number1,myOper.op_arit,myOper.number2,myOper.resultado);                
                clearOpObject();
                break;
                default:
               
                return;
                clearOpObject()            
        }
        
    });

    /*function to eliminate characters */  
        
        $('.btn-delete').click(function(){
            var resultValue = "";
            var resultMatrix = "";
            var arrayNumbers = [];
            var numbernew = "";
        
        if($('.input-resultado').val() == ""){        
            
        }else{            
            resultValue = $('.input-resultado').val();            
            resultMatrix = resultValue.split('');
            
            if(resultMatrix.length > 0){       
                resultMatrix.splice(0,1);                
            }            
            arrayNumbers = resultMatrix;
            
           for(var i=0;i<arrayNumbers.length;i++){
                numbernew+= arrayNumbers[i]
           }
          
           if(arrayNumbers.length == 0){            
            $('.input-resultado').val(0);
               clearOpObject();             
            }

           $('.input-resultado').val(numbernew);
            
        }            

        });

        //show results in the right column
        
        $('.btn-equal').on('click',function(){
            
            if(operationsVault.length == 0){                
                return;
            }else{
                $('.rabish-bin').css('display','block');
               
                console.log(operationsVault);
                vaultLength = operationsVault.length;             
                                           
                    $('.proceso').append("<div class='operacion'>"
                    +"<p>"+operationsVault[vaultLength-1]['number1']
                    +operationsVault[vaultLength-1]['op_arit']
                    +operationsVault[vaultLength-1]['number2']
                    +" = "+operationsVault[vaultLength-1]['resultado']+"</p>"
                    +"</div>");

                   
                
            }
        });

        //function to clear the main screen
        let deleteScreen = document.querySelector('.op-delete');     
        deleteScreen.onclick = (e) => {
           cleanScreen();
           clearOpObject();
        }

        //code to delete the display of operations and array where the operations are stored
        $('.rabish-bin').on('click',function(){            
            $('.operacion').remove();
            cleanScreen();
            clearOpObject();
            $('.process-window').text("");
            if(!$('.proceso').hasClass('operacion')){
                $('.rabish-bin').css('display','none');
            }
        });
       
       
       
   
    




});