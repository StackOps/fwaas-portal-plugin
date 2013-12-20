fwaas-portal-plugin
===================

## Generate dist

```
$> mvn clean install
```

## Release

 1. Merge to master

 ```
 $> git checkout master
 $> git merge development
 $> git push
 ```

 2. Make the release
 This step requires some configuration in you local Maven. Add ```stackops-plugins``` as server in the ```servers``` section on ```settings.xml```, using username/password. The set up user requires deploy permissions to ```https://clinker.stackops.org/nexus/content/repositories/stackops-plugins```

 Then, make the release:
 ```
 $> mvn release:prepare release:perform
 ```
 This command will create the tag and deploy artifact to Stackops plugins repository (which will be used by Portal as update center).


