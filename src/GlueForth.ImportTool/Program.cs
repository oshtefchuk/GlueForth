using System;
using System.Diagnostics;
using System.Linq;
using System.IO;

namespace Bit.EA.WorkflowTools
{
	internal static class Program
	{

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		private static void Main(string[] args)
		{
			try
			{
    //            if (args.Length == 1)
				//{
					new ImportTool().DoImport("");
				//}
				//else
				//{
				//	Help();
				//}
				PauseInDebugConsole();
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
			}
		}

		/// <summary>
        /// Display short user manual
        /// </summary>
		private static void Help()
		{
			Console.WriteLine("Provide import file path as parameter");
		}

        /// <summary>
        /// Wait for a keystroke only then running in the VisualStudio debugger
        /// </summary>
		[Conditional("DEBUG")]
		private static void PauseInDebugConsole()
        {
			if (AppDomain.CurrentDomain.FriendlyName.EndsWith("vshost.exe", StringComparison.OrdinalIgnoreCase) || System.Diagnostics.Debugger.IsAttached)
            {
                try
                {
                    Console.CursorVisible = Console.CursorVisible; // Inflict IOException if Console output is redirected to file
                    Console.WriteLine("\nPress any key...");
                    Console.ReadKey(true);
                }
                catch (IOException)
                {
                    // No interactive Console, skipping
                }
            }
        }
	}
}
