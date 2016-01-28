# Simulating bash shell with nodeJS
Using nodejs system hooks, will implement following cmds, 
  - pwd/cwd
  - date
  - ls
  - echo (with env variable support, ex: echo $PATH)
  - cat
  - head
  - tail
  - wc, return number of lines in file
  - sort, by line in file
  - uniq, strip non-unique lines only if previous line is the same
  - curl (uses request module)
  - piping