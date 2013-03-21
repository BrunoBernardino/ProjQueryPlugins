window.myApp = {};

window.myApp.ptDictionary = {
	// ...
	"Required" : "Obrigatório",
	"This field is required." : "Este campo é obrigatório.",
	"Too Big" : "Grande",
	"This field's value is too big. The maximum number of characters for it is %s." : "O valor deste campo é muito grande. O número máximo de caracteres para ele é de %s.",
	"Invalid" : "Inválido",
	"This field's value isn't alphanumeric. It must consist only of numbers and/or (non-special) letters." : "O valor deste campo não é alfanumérico. Tem de consistir apenas em números e/ou letras (não especiais).",
	"This field's value isn't alphanumeric. It must consist only of numbers, letters, dots, underscores, dashes and spaces." : "O valor deste campo não é alfanumérico. Tem de consistir apenas em números, letras, pontos, underscores, hífens e espaços.",
	"This field's value isn't an email. It must be a valid email address." : "O valor deste campo não é um email. Tem de ser um endereço de email válido.",
	"This field's value isn't an URL. It must be a valid URL and start with http://, for example." : "O valor deste campo não é um URL. Tem de ser um URL válido e começar por http://, por exemplo.",
	"This field's value isn't a number. It must be a valid natural number." : "O valor deste campo não é um número. Tem de ser um número natural válido.",
	"This field's value isn't a valid slug. It must consist only of numbers, lowercase (non-special) letters, underscores and dashes." : "O valor deste campo não é um slug válido. Tem de consistir apenas em números, letras minúsculas (não especiais), underscores e hífens."
};

$.i18n.setDictionary( window.myApp.ptDictionary );