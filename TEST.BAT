SET DIR=..\C64-BASIC-master
FOR /R "%DIR%" %%G IN (*.txt) DO (
    pnpm run c64compile "%%G"
)