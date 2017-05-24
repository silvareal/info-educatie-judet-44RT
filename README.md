<h1>4Art</h1>

<p>Version 0.0.2 of the project.

#TODO

        -authorization rules {
        Status: Pending,
        Notes: Basic rules have been set but due to lack of Redux, state can be manipulated from the console. For version 0.0.4, Redux is required
        Update: Authorization rules are now set on server side.
         Even if somebody modifies a value like isAdmin to true while he's not, he can only see sensitive data. 
         This requires us to have a separate login for admin panel
        }
        
        -homepage for guests{
        Status: Complete,
        Notes: No notes
        }
        -browse all collections both by guests and users {
        Status: Complete,
        Notes: Also added style to 2/3 collection pages ( Browse and Manage )
        TODO: Add to admin panel
        }
        
        -browse all news both by guests and users
        
        -readOne news&collections with authorization rules for commenting {
        Status: Complete,
        Notes: Must add style to comment section
        }
        
        -add the text editor to admin panel{
        Status: 1/2 Complete,
        Notes: Must also add it to news management and finish both pages for news
        }
        
        -make a placeholder for the contact page for v0.0.4
        
        -like system
        
        -reorganize all files in specific folders {
        Status: Complete,
        Notes: Further development of the interface might require us to reorganize again
        }
        
        -think of a design for the logs page ( should be simple )
        -on users management, have the make moderators on the AppBar and create ALL the rules for banning users
        -create specific actions for moderators
        -PENDING: finish readAll, readOne, create, delete pages
        
        -remove event listeners{
        Status: Complete,
        Notes: Regarding 'load' event listeners, we will replace XML requests with Axios, a dependency that also includes the Promise API in version 0.0.4
        }
        
        -write for us button should lead to a way of applying as a mod
        -that being said, make the application for mod page

        -unless there's anything left,clean up the code, remove futile variables and state
        -make efficient functions and use them where necessary
        -rework the hierarchy and split jobs between parents and children
        */
</p>