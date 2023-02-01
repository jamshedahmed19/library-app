import { SvgIconComponent } from "@mui/icons-material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import { paths } from "../../routes/paths";

export interface IPath {
  name: string;
  path: string;
  icon: SvgIconComponent;
}



export const SIDEBAR_PATHS: IPath[] = [
    {name: "Dashboard", path: paths.dashboard, icon: DashboardIcon},
    {name: "Books", path: paths.books, icon: BookRoundedIcon},
    {name: "Newspapers", path: paths.newspapers, icon: NewspaperRoundedIcon},
    {name: "Documentaries", path: paths.documentaries, icon: HistoryEduRoundedIcon},
];