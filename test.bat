@REM Do not change anything here.
@echo off
if %1 == 1 goto stest
if %1 == 2 goto otest
if %1 == 3 goto bruhmocha
if %1 == 4 goto minify
:menu
cls
title Test picker
echo.
echo 1. Simple test
echo 2. OverAll test
echo 3. bruhmocha test
echo 4. Minify
echo 5. exit
set /p input="number: " 
if %input% == 1 goto stest
if %input% == 2 goto otest
if %input% == 3 goto bruhmocha
if %input% == 4 goto minify
if %input% == 5 exit
goto menu

:stest
cls
title TEST STARTED -simple test-
echo.
echo NODE VERSION:
node -v
echo.
echo NPM VERSION:
call npm -v
echo.
echo CHECKING OTHER FILE VERSIONS:
call npm version
echo.
echo.
echo.
echo Running Javascript test
node ./test/simpletest.js
echo.
echo TEST ENDED
title TEST ENDED -simple test-
exit

:otest
cls
title TEST STARTED -overall test-
echo.
echo NODE VERSION:
node -v
echo.
echo NPM VERSION:
call npm -v
echo.
echo CHECKING OTHER FILE VERSIONS:
call npm version
echo.
echo.
echo Running Javascript test
node ./test/overAlltest.js
echo.
echo TEST ENDED
title TEST ENDED -overall test-
exit

@REM the minifier.js is hidden sorry
:minify
cls
echo Minifying JS files...
echo.
echo Minifying kasuApi.js
call minify ./lib/kasuApi.js > ./lib/kasuApi.min.js
cls
echo Minifying JS files...
echo.
echo Minifying kasuApi.js - DONE
echo Minifying parser.js
call minify ./lib/src/parser.js > ./lib/src/parser.min.js
cls
echo Minifying JS files...
echo.
echo Minifying kasuApi.js - DONE
echo Minifying parser.js - DONE
echo.
echo.
echo Finishing contents..
node minifier.js
echo DONE
exit

:bruhmocha
cls
title TEST STARTED -bruhmocha test-
echo.
echo NODE VERSION:
node -v
echo.
echo NPM VERSION:
call npm -v
echo.
echo CHECKING OTHER FILE VERSIONS:
call npm version
echo.
echo.
node ./test/test
echo.
echo TEST ENDED
title TEST ENDED -bruhmocha test-
exit