@REM Do not change anything here.
@echo off
:menu
cls
title Test picker
echo.
echo 1. Simple test
echo 2. OverAll test
echo 3. Minify
echo 4. exit
set /p input="number: " 
if %input% == 1 goto stest
if %input% == 2 goto otest
if %input% == 3 goto minify
if %input% == 4 exit
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
node ./test/test.js
echo TEST ENDED
title TEST ENDED -simple test-
pause>nul
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
echo TEST ENDED
title TEST ENDED -overall test-
pause>nul
exit

@REM the minifier.js is hidden sorry
:minify
cls
echo Minifying JS files...
echo.
echo Minifying main.js
call minify ./lib/main.js > ./lib/main.min.js
cls
echo Minifying JS files...
echo.
echo Minifying main.js - DONE
echo Minifying shorter.js
call minify ./lib/src/shorter.js > ./lib/src/shorter.min.js
cls
echo Minifying JS files...
echo.
echo Minifying main.js - DONE
echo Minifying shorter.js - DONE
echo minifying fectcher.js
call minify ./lib/src/fetcher.js > ./lib/src/fetcher.min.js
cls
echo Minifying JS files...
echo.
echo Minifying main.js - DONE
echo Minifying shorter.js - DONE
echo minifying fectcher.js - DONE
echo.
echo.
echo Renaming contents..
node minifier.js
echo DONE
exit