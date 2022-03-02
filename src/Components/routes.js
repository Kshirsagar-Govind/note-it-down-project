
import ProfilePage from "./Pages/home-page";
import AllNotesPage from "./Pages/all-notes";
import TasksPage from "./Pages/tasks";
import RemindersPage from "./Pages/reminders";
import PasswordsPage from "./Pages/passwords";
import ExpensesPage from "./Pages/expenses";


const routes = [

    {
        path: "/home",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <ProfilePage />
    },

    {
        path: "/all-notes",
        sidebar: () => <div>All Notes</div>,
        main: () => <AllNotesPage />
    }
    ,

    {
        path: "/tasks",
        sidebar: () => <div>All Notes</div>,
        main: () => <TasksPage />
    }

    ,

    {
        path: "/reminders",
        sidebar: () => <div>All Notes</div>,
        main: () => <RemindersPage />
    }

    ,

    {
        path: "/passwords",
        sidebar: () => <div>All Notes</div>,
        main: () => <PasswordsPage />
    }

    ,

    {
        path: "/all-notes",
        sidebar: () => <div>All Notes</div>,
        main: () => <AllNotesPage />
    }
    ,

    {
        path: "/expenses",
        sidebar: () => <div>All Notes</div>,
        main: () => <ExpensesPage />
    }
];

export default routes;