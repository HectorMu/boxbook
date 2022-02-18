module.exports = (link) => {
  return `
    <div style="font-family: arial;font-family:arial;border: 1px solid #0006;">
        <div class="container" style="font-family: arial;">
                             <div class="col-md-12">
                                 <div class="box" style="border: 1px solid #e9ecef;padding: 5px;">
                                      <h1><Strong>¡Hi there!</Strong></h1> 
                                      <p style="font-size: 20px;">
                                          You are receiving this email because you did a password reset request for your account.
                                          This link will be active only by 15 minutes counting since the request was made.
                                         <br>
                                         <br>
                                         <center> 
                                             <a  style="text-decoration: none;color: 
                                             #fff;background-color: gray;border-color: gray;
                                             display: inline-block;
                                             margin-bottom: 0;font-weight: 400;
                                             text-align: center;white-space: nowrap;
                                             vertical-align: middle;-ms-touch-action: manipulation;
                                             touch-action: manipulation;cursor: pointer;background-image: none;
                                             border: 1px solid transparent;
                                             padding: 6px 12px;font-size: 20px;line-height: 1.42857143;
                                             border-radius: 4px;-webkit-user-select: none;-moz-user-select: none;
                                             -ms-user-select: none;user-select: none;"  
                                             style="font-size: 20px;" href="${link}" >Reset password</a>
                                         </center>
                                         <br>
                                         <br>
                                             <p style="font-size: 20px;">
                                                If you didn't request a password change, you can ignore this email.
                                                 
                                                 <br>
                                                 Greetings, Héctor Muñoz, Node Notes CEO.
                                             </p>
                                      </p>  
                                 </div>
                             </div>
          </div>
 
    </div>`;
};
