if [ ! -d "kango" ]; then
    mkdir kango
    wget -O kango/kango-framework-latest.zip http://kangoextensions.com/kango/kango-framework-latest.zip 
    unzip kango/kango-framework-latest.zip -d kango
else
    echo '[NOTICE] : Kango already installed'
fi
