module.exports = ({
  nom,
  prenom,
  tel,
  email,
  nombredenfants,
  regime,
  ville,
  codepostal,
  datenaissance,
  datedeffets,
}) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Choisir mutuelle</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                           //  <td class="title"><img  src="https://choisirmutuelle.ga/static/media/logo.6b687038.png"
                           //     style="width:100%; max-width:156px;"></td>
                           //  <td>
                            Date: ${`${today.getDate()}. ${
                              today.getMonth() + 1
                            }. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                            Nom du client: ${nom} ${prenom}
                            </td>
                            <td>
                               Email: ${email}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>les informations:</td>
                   <td></td>
                </tr>
                <tr class="item">
                   <td>Télé:</td>
                   <td>${tel}</td>
                </tr>
                <tr class="item">
                   <td>Nombre d'enfants:</td>
                   <td>${nombredenfants}</td>
                </tr>
                 <tr class="item">
                   <td>Régime:</td>
                   <td>${regime}</td>
                </tr>
                <tr class="item">
                   <td>Ville:</td>
                   <td>${ville}</td>
                </tr>
                 <tr class="item">
                   <td>Code postal:</td>
                   <td>${codepostal}</td>
                </tr>
                <tr class="item">
                   <td>Code Date naissance:</td>
                   <td>${datenaissance}</td>
                </tr>
                <tr class="item">
                   <td>Date d'effets:</td>
                   <td>${datedeffets}</td>
                </tr>
             </table>
             <br />
             <h1 class="justify-center">
              Choisir Mutuelle
             </h1>
          </div>
       </body>
    </html>
    `;
};
