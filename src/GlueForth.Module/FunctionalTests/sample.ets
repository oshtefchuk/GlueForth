;#DropDB BlueNorthEasyTest

#Application BlueNorth.Win
#Application BlueNorth.Web

*FillForm
 User Name = Admin
*Action Log On

#IfDef BlueNorth.Win

*Action About...
 
*Action OK

#EndIf

#IfDef BlueNorth.Web
*Action Navigation(My Details)
#EndIf
