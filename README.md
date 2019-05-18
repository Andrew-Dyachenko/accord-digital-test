# accord-digital-test
Performed test task from accord digital company
Test task description located [here](https://docs.google.com/document/d/1uzPEvCPxM4OIYovl-jjoKZtnbdEo-TzoTPcOLyycWCU/edit)

## Development
### Cloning
To start using this project, please clone it to your platform.
Open a terminal `Ctrl + T` (for Linux) and go to the folder where all your Internet projects are stored. for example: `cd /var/www`.
Clone this repository to the projects folder.

```
git clone https://github.com/Andrew-Dyachenko/accord-digital-test.git
```

### Deploy
Go to the cloned project folder
```
cd accord-digital-test/
```
Install the required package dependencies
> It is assumed that you have the package manager Yarn installed, otherwise you can always roll back to using NPM
```
yarn
```

### Runing
After completing the installation of the necessary dependencies, you can run the project build. The Server-launched page can be seen at [http://localhost:3000](http://localhost:3000)
```
yarn start
```

### Fixing
#### SCSS
При возникновении в консоли предупреждений об ошибках в стилях SCSS используйте команду `yarn scss-fix`, которая исправит большинство ошибок
