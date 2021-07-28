import sys,re

with open(sys.argv[1], 'r') as fp:
    lines=fp.readlines()


for l in lines:
    if (l.strip()==''):
        continue

    col=l.split(';')

    all_name=re.sub( '"','',col[0]).split()

    s=all_name[-1]
    abb_name=' '.join(all_name[0:-1])+' '+s[0]+'.'
    und_name=('_'.join(all_name[0:-1])+'_'+s[0]+'.jpg').lower()
        
    print('// '+col[0])
    print('// '+' '.join(col[1:]) )

    brevetti=re.sub('GUE','',
                    re.sub('"','',col[1])    ).split(',')

    x={}


    level=''
    ccr=''
    dpv=''
    
    for b in brevetti:        
        m=re.search('([0-9])', b)
        if m is None:
            grade='1'
        else:
            grade=m.group(0)
        
        if ('fundamental' in b.lower()):
            level='Fundamentals'
            continue
        if ('ccr' in b.lower()):
            level='CCR '+grade
            continue
        if ('tec' in b.lower()):
            level='Tech '+grade

        if ('dpv' in b.lower()):
            dpv='DPV '+grade
            continue
           
        
    
    print(  f'''/*, {{ name : \"{abb_name}" ,
	level : "{level}",
	ccr : "{ccr}",
	image : "images/associati/{und_name}",
	dpv : "{dpv}",
	female : "false"
    }} */
      ''' )
    print('')
