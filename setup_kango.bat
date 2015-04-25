IF NOT EXIST kango GOTO CREATE_KANGO_DIR
echo [NOTICE] : Kango already installed
:CREATE_KANGO_DIR
mkdir kango
wget -O kango/kango-framework-latest.zip http://kangoextensions.com/kango/kango-framework-latest.zip
7z x kango/kango-framework-latest.zip -okango