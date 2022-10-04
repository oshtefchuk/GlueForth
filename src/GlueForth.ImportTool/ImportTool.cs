using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using DevExpress.Xpo;
using System.Data.SqlClient;
using BlueNorth.Model;

namespace Bit.EA.WorkflowTools
{
    [NonPersistent]
    public class ImportTool
    {
        /// <summary>
        /// </summary>
        public void DoImport(string importFileName)
        {

            var connectionString = ConfigLoader.ConnectionStrings["ConnectionString"];
            if (connectionString == null || string.IsNullOrWhiteSpace(connectionString.ConnectionString))
            {
                Console.WriteLine("SQL connection string is not set in config file");
                return;
            }
            var lines = File.ReadAllLines(@"g:\work\BlueNorth\Standards Import Master_Updated Format.csv");
            var csv = from line in lines
                      select (line.Split(',')).ToArray();
            using (var session = new Session { Connection = new SqlConnection(connectionString.ConnectionString) })
            {

                foreach (var line in csv)
                {
                    if (line[0].StartsWith("Standard")) continue;
                    session.BeginTransaction();
                    try
                    {
                        var standard = new XPQuery<Standard>(session).FirstOrDefault(x => x.Reference.ToLower() == line[0].ToLower());
                        var standardChapterreference = line[1].EndsWith(".") ? line[1].TrimEnd('.') : line[1];
                        var standardChapter = new XPQuery<StandardChapter>(session).FirstOrDefault(x => x.Reference.Trim().ToLower() == standardChapterreference.Trim().ToLower());
                        if (standardChapter == null)
                        {
                            Console.WriteLine("\n Not found StandardChapter" + standardChapterreference);
                            if (session.InTransaction)
                            {
                                session.RollbackTransaction();
                            }
                            continue;
                        }
                        if (standardChapter.Standard == null)
                        {
                            standardChapter.Standard = standard;
                            standardChapter.Save();
                        }
                        var standardContent = new XPQuery<StandardContent>(session).FirstOrDefault(x => x.Reference.ToLower() == line[2].ToLower());
                        if (standardContent == null)
                        {
                            Console.WriteLine("\n Not found standardContent " + line[2]);

                        }
                        else
                        {
                            if (standardContent.StandardChapter == null)
                            {
                                standardContent.StandardChapter = standardChapter;
                                standardContent.Save();
                            }
                            int questionGroupId;
                            if (!string.IsNullOrEmpty(line[3]) && int.TryParse(line[3], out questionGroupId))
                            {
                                if (standardContent.QuestionGroups.All(x => x.Oid != questionGroupId))
                                {
                                    var questionGroup = new XPQuery<QuestionGroup>(session).FirstOrDefault(x => x.Oid == questionGroupId);
                                    standardContent.QuestionGroups.Add(questionGroup);
                                    standardContent.Save();
                                }
                                int characteristicOid = int.Parse(line[4]);
                                var characteristicReference = new XPQuery<Characteristic>(session).FirstOrDefault(x => x.Oid == characteristicOid).Reference.Trim().ToLower();
                                var allcharacteristics = new XPQuery<Characteristic>(session).Where(x => x.Reference.Trim().ToLower() == characteristicReference);
                                foreach (var character in allcharacteristics)
                                {
                                    if (standardContent.Characteristics.All(x => x.Oid != character.Oid))

                                    {
                                        var characteristic = new XPQuery<Characteristic>(session).FirstOrDefault(x => x.Oid == characteristicOid);
                                        standardContent.Characteristics.Add(characteristic);
                                        standardContent.Save();
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        if (session.InTransaction)
                        {
                            session.RollbackTransaction();
                        }
                        return;

                        throw;
                    }
                    if (session.InTransaction)
                    {
                        session.CommitTransaction();
                    }
                }
            }
            Console.WriteLine(String.Format("Import finished. {0} rows imported", csv.Count()));
        }
    }
}
